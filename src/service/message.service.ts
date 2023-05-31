import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Context } from '@midwayjs/koa';
import { addMessageParam } from '../dto/message/addMessageParam';
import { FunMessage } from '../entity/FunMessage';
import { Pageparam } from '../util/Page/PageParam';
import { Pagination } from '../util/Page/Pagination';
import { ReqUtil } from '../util/ReqUtil/ReqUtil';
import { TimeUtil } from '../util/Time/TimeUtil';
import { getUUID } from '../util/UUID/UUID';
@Provide()
export class MessageService {
    @Inject()
    ctx: Context;

    @InjectEntityModel(FunMessage)
    messageModel: Repository<FunMessage>;
    // 根据分页参数获取留言
    async getAllMessage(pageParam: Pageparam) {
        const query: SelectQueryBuilder<FunMessage> = this.messageModel
            .createQueryBuilder()
            .orderBy('create_time', 'ASC');
        const result = Pagination.findByPage(query, pageParam);
        return result;
    }
    // 添加留言
    async save(addMessageParam: addMessageParam) {
        const addParam = new FunMessage();
        addParam.uuid = getUUID();
        addParam.browser = ReqUtil.getBrowser(this.ctx);
        addParam.ip = ReqUtil.getIp(this.ctx);
        addParam.avatar = addMessageParam.avatar;
        addParam.content = addMessageParam.content;
        addParam.name = addMessageParam.name;
        addParam.isVisitor = addMessageParam.isVisitor;
        addParam.createTime = TimeUtil.GetNowTime();
        addParam.del = 0;
        addParam.updateTime = TimeUtil.GetNowTime();
        addParam.system = ReqUtil.getOS(this.ctx);
        const result: Promise<FunMessage> = this.messageModel.save(addParam);
        return result;
    }
}
