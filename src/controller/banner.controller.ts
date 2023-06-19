import {
    Body,
    Controller,
    Del,
    Get,
    Inject,
    Post,
    Put,
    Query,
} from '@midwayjs/core';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@midwayjs/swagger';
import { Context } from 'koa';
import { AddHomeBannerParam } from '../dto/banner/AddHomeBannerParam';
import { UpdataBannerParam } from '../dto/banner/UpdataBannerParam';
import { SysBanner } from '../entity/SysBanner';
import { BannerEnums } from '../enum/FunEnums';
import { BannerService } from '../service/banner.service';
import { FileService } from '../service/file.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { getUUID } from '../util/Other/Utils';

@ApiBearerAuth()
@ApiTags('轮播图')
@Controller('/banner')
export class BannerController {
    @Inject()
    ctx: Context;

    @Inject()
    fileService: FileService;

    @Inject()
    bannerService: BannerService;

    @ApiOperation({ summary: '获取指定位置的顶部banner信息' })
    @Get('/', { description: '获取指定位置的顶部banner信息' })
    @ApiParam({
        example: 'banner_[]',
        name: 'classify',
    })
    async getBanner(@Query('classify') classify: string) {
        return ApiResult.ok(
            await this.bannerService.bannerModel.findOne({
                where: { classify: classify },
            })
        );
    }
    @ApiOperation({ summary: '修改指定位置的顶部banner信息' })
    @Put('/', { description: '修改指定位置的顶部banner信息' })
    @ApiBody({ type: UpdataBannerParam })
    async updateBanner(@Body() updataBannerParam: UpdataBannerParam) {
        const upParam = new SysBanner();
        Object.assign(upParam, updataBannerParam); // 复制值给对象参数。
        return (await this.bannerService.bannerModel.save(upParam))
            ? ApiResult.upStatus(true)
            : ApiResult.upStatus(false);
    }

    @ApiOperation({ summary: '上传一张主页可供随机的背景' })
    @Post('/', { description: '上传一张主页可供随机的背景' })
    @ApiBody({ type: AddHomeBannerParam })
    async upLoadHomeBanner(@Body() addHomeBannerParam: AddHomeBannerParam) {
        const addHomeBanner = new SysBanner();
        addHomeBanner.backImg = addHomeBannerParam.url;
        addHomeBanner.classify = BannerEnums.HOME;
        addHomeBanner.uuid = getUUID();
        return (await this.bannerService.bannerModel.save(addHomeBanner))
            ? ApiResult.upStatus(true)
            : ApiResult.upStatus(false);
    }

    @ApiOperation({ summary: '删除一张主页图片' })
    @Del('/', { description: '删除一张主页图片' })
    async delHomeBanner(@Query('uuid') uuid: string) {
        return ApiResult.delStatus(
            (await this.bannerService.bannerModel.delete(uuid)) ? true : false
        );
    }
}
