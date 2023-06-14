import { IMiddleware, Inject, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { SysLog } from '../entity/SysLog';
import { TimeUtil, getUUID } from '../util/Other/Utils';
import { ReqUtil } from '../util/ReqUtil/ReqUtil';
import { DictService } from '../service/dict.service';
import { StatisticsEnums } from '../enum/FunEnums';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
    @InjectEntityModel(SysLog)
    sysLog: Repository<SysLog>;

    @Inject()
    dictService: DictService;

    resolve() {
        return async (ctx: Context, next: NextFunction) => {
            //控制器前执行的逻辑
            const startTime = Date.now();
            // 执行下一个 Web 中间件，最后执行到控制器
            // 这里可以拿到下一个中间件或者控制器的返回值
            const result = await next();
            // 控制器之后执行的逻辑
            ctx.logger.info(
                // eslint-disable-next-line prettier/prettier
                `Report in "src/middleware/report.middleware.ts", rt = ${Date.now() - startTime}ms`
            );
            // 添加访问量
            this.dictService.addStatisticsNum(StatisticsEnums.FLOW_RATE);
            this.logger(ctx);
            // 返回给上一个中间件的结果
            return result;
        };
    }
    //数据库中写入日志
    private logger(ctx: Context) {
        const logIn = new SysLog();
        logIn.port = ctx.url;
        logIn.ip = ReqUtil.getIp(ctx);
        logIn.browser = ReqUtil.getBrowser(ctx);
        logIn.system = ReqUtil.getOS(ctx);
        logIn.uuid = getUUID();
        logIn.creatTime = TimeUtil.GetNowTime();
        logIn.method = ctx.method; // 请求方法，GET或POST
        logIn.data = JSON.stringify(ctx.request.body);
        if (ctx.URL.pathname.concat('login')) {
            logIn.userId = '用户登录';
        } else {
            logIn.userId = ctx.user.uuid;
        }
        this.sysLog.insert(logIn);
    }

    static getName(): string {
        return 'report';
    }
}
