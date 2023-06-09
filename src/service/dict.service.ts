import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInfoParam } from '../dto/home/UpdateUserInfoParam';
import { SysDict } from '../entity/SysDict';
import { FunEnums } from '../enum/FunEnums';
import { DictUtils } from '../util/Other/Utils';

@Provide()
export class DictService {
    @InjectEntityModel(SysDict)
    dictModel: Repository<SysDict>;

    /**
     * 获取网站首页的名称和座右铭
     * @param pos 类型
     * @returns 结果
     */
    async getBlogInfo() {
        const reSql = await this.dictModel
            .createQueryBuilder()
            .where('classify=:classify', { classify: FunEnums.HOME })
            .getMany();
        return DictUtils.dictToBean(reSql);
    }
    /**
     * 更新网站首页的名称和座右铭
     * @returns 修改结果
     */
    setBlogInfo(param: UpdateUserInfoParam): boolean {
        return this.updateDict(FunEnums.HOME, param);
    }
    /**
     * 封装更新字典方法
     * @param classify 更新的大类
     * @param options 参数对象
     */
    private updateDict(classify: FunEnums, options: any): boolean {
        let successTag = false;
        Object.getOwnPropertyNames(options).forEach(async key => {
            const query = this.dictModel
                .createQueryBuilder()
                .update()
                .where('classify = :classify', { classify: classify });
            query.set({ value: options[key] });
            query.andWhere('key = :key', { key: key });
            const reSql = await query.execute();
            reSql.affected > 0 ? (successTag = true) : (successTag = false);
        });
        return successTag;
    }
}
