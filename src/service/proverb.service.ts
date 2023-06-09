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
    async getProverb(pos: string) {
        const reSql: FunHome[] = await this.homeModel
            .createQueryBuilder()
            .where('pos=:pos', { pos: pos.toString() })
            .orderBy('RAND()')
            .limit(1)
            .getMany();

        return reSql[0];
    }
    /**
     * 获取指定类型的名言
     * @param proverbEnums 主页名言类型枚举
     * @returns 该类的所有的名言
     */
    async getAllSaying(proverbEnums: string) {
        return await this.homeModel.find({
            where: { pos: proverbEnums },
        });
    }
}
