import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { FunHome } from '../entity/FunHome';
@Provide()
export class ProverbSerice {
    @InjectEntityModel(FunHome)
    homeModel: Repository<FunHome>;
    /**
     * 根据位置随机获取一句名言
     * @param pos 类型
     * @returns 结果
     */
    async getProverb(pos: number) {
        return await this.homeModel
            .createQueryBuilder()
            .where('pos=:pos', { pos: pos.toString() })
            .orderBy('RAND()')
            .limit(1)
            .getMany();
    }
}
