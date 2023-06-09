import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { SysBanner } from '../entity/SysBanner';
import { BannerEnums } from '../enum/FunEnums';
@Provide()
export class BannerService {
    @InjectEntityModel(SysBanner)
    bannerModel: Repository<SysBanner>;

    /**
     * 根据位置随机获取一张主页图片
     * @param pos 类型
     * @returns string
     */
    async getHomeBanner(): Promise<string> {
        const reSql = await this.bannerModel
            .createQueryBuilder()
            .where('classify=:classify', { classify: BannerEnums.HOME })
            .orderBy('RAND()')
            .limit(1)
            .getMany();
        return reSql[0].backImg;
    }

    /**
     * 获取指定位置的所有背景图
     * @returns 指定位置的所有背景图
     */
    async getAllBgPic(bannerEnum: BannerEnums) {
        return await this.bannerModel.find({
            where: { classify: bannerEnum },
        });
    }
}
