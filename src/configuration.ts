import * as casbin from '@midwayjs/casbin';
import {
    App,
    Configuration,
    Inject,
    MidwayDecoratorService,
} from '@midwayjs/core';
import * as cos from '@midwayjs/cos';
import * as crossDomain from '@midwayjs/cross-domain';
import * as info from '@midwayjs/info';
import * as jwt from '@midwayjs/jwt';
import * as koa from '@midwayjs/koa';
import * as passport from '@midwayjs/passport';
import * as swagger from '@midwayjs/swagger';
import * as typeorm from '@midwayjs/typeorm';
import * as upload from '@midwayjs/upload';
import * as validate from '@midwayjs/validate';
import { join } from 'path';
import { STATISTICS_KEY } from './decorator/statistics.decorator';
import {
    TokenExpiredFilter,
    UnauthorizedFilter,
    NoAuthorityFilter,
} from './filter/identity.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ValidateErrorFilter } from './filter/validate.filter';
import { UserGuard } from './guard/UserGuard';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { ReportMiddleware } from './middleware/report.middleware';
import { DictService } from './service/dict.service';

@Configuration({
    imports: [
        koa,
        typeorm,
        swagger,
        validate,
        cos,
        passport,
        casbin,
        jwt,
        upload,
        crossDomain,
        info,
    ],
    importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
    @App()
    app: koa.Application;

    @Inject()
    decoratorService: MidwayDecoratorService;

    @Inject()
    dictService: DictService;

    async onReady() {
        // 使用中间件
        this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
        // 使用过滤器
        this.app.useFilter([
            NotFoundFilter,
            ValidateErrorFilter,
            TokenExpiredFilter,
            UnauthorizedFilter,
            NoAuthorityFilter,
        ]);
        // 使用管道
        this.app.useGuard(UserGuard);
        // 方法装饰器的实现
        this.decoratorService.registerMethodHandler(STATISTICS_KEY, option => {
            return {
                before: async () => {
                    this.dictService.addStatisticsNum(option.metadata.key);
                },
            };
        });
    }
}
