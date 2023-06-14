import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { AddMessageParam } from '../dto/message/AddMessageParam';
import { FunMessage } from '../entity/FunMessage';
import { TimeUtil, getUUID } from '../util/Other/Utils';
import { Pageparam } from '../util/Page/PageParam';
import { Pagination } from '../util/Page/Pagination';
import { ReqUtil } from '../util/ReqUtil/ReqUtil';
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
    async addMessage(addMessageParam: AddMessageParam) {
        const addParam = new FunMessage();
        addParam.uuid = getUUID();
        addParam.browser = ReqUtil.getBrowser(this.ctx);
        addParam.ip = ReqUtil.getIp(this.ctx);
        Object.assign(addParam, addMessageParam);
        addParam.createTime = TimeUtil.GetNowTime();
        addParam.del = 0;
        addParam.updateTime = TimeUtil.GetNowTime();
        addParam.system = ReqUtil.getOS(this.ctx);
        const result: Promise<FunMessage> = this.messageModel.save(addParam);
        return result;
    }
}
