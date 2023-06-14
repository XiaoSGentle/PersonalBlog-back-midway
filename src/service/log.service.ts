import { Provide } from '@midwayjs/core';
import { SysLog } from '../entity/SysLog';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Pageparam } from '../util/Page/PageParam';
import { Pagination } from '../util/Page/Pagination';

@Provide()
export class LogService {
    @InjectEntityModel(SysLog)
    logModel: Repository<SysLog>;

    /**
     * 根据分页获取分页后的数据
     * @param pageParam 分页参数
     * @returns 获取的分页数据
     */
    async getSysLogs(pageParam: Pageparam) {
        const query = this.logModel.createQueryBuilder().select();
        return await Pagination.findByPage(query, pageParam);
    }
}
