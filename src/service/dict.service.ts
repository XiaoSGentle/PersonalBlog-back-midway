import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInfoParam } from '../dto/home/UpdateUserInfoParam';
import { SysDict } from '../entity/SysDict';
import { FunEnums, StatisticsEnums } from '../enum/FunEnums';
import { DictUtils } from '../util/Other/Utils';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class DictService {
    @InjectEntityModel(SysDict)
    dictModel: Repository<SysDict>;

    /**
     * 获取网站首页的名称和座右铭
     * @param pos 类型
     * @returns 结果
     */
    async getBlogInfo() {
        return await this.getDictInfo(FunEnums.HOME);
    }
    /**
     * 获取网页的统计信息
     * @returns 统计结果对象
     */
    async getStaisInfo() {
        return await this.getDictInfo(FunEnums.STATISTICS);
    }
    /**
     * 更新网站首页的名称和座右铭
     * @returns 修改结果
     */
    setBlogInfo(param: UpdateUserInfoParam): boolean {
        return this.updateDict(FunEnums.HOME, param);
    }
    /**
     * 网站统计添加数据
     * @param statisticsEnum 需要增加类型的枚举
     */
    async addStatisticsNum(statisticsEnum: StatisticsEnums) {
        this.dictModel
            .createQueryBuilder()
            .update()
            .set({ value: () => '`value` + 1' })
            .where('classify=:classify', { classify: FunEnums.STATISTICS })
            .andWhere('key=:key', { key: statisticsEnum })
            .execute();
    }
    /**
     * 封装更新字典方法
     * @param classify 更新的大类
     * @param options 参数对象
     */
    private updateDict(classify: FunEnums, options: any): boolean {
        let successTag = true;
        const keys = Object.getOwnPropertyNames(options);
        keys.forEach(async key => {
            const query = this.dictModel
                .createQueryBuilder()
                .update()
                .where('classify = :classify', { classify: classify });
            query.set({ value: options[key] });
            query.andWhere('key = :key', { key: key });
            const reSql = await query.execute();
            successTag = reSql.affected > 0;
        });
        return successTag;
    }

    /**
     *  封装根据类名去获取对象
     * @param funEnums 功能枚举
     * @returns 结果对象
     */
    private async getDictInfo(funEnums: FunEnums) {
        const reSql = await this.dictModel
            .createQueryBuilder()
            .where('classify=:classify', { classify: funEnums })
            .getMany();
        return DictUtils.dictToBean(reSql);
    }
}
