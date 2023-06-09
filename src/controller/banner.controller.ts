import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@midwayjs/swagger';
import { Context } from 'koa';
import { UpdataBannerParam } from '../dto/banner/UpdataBannerParam';
import { BannerService } from '../service/banner.service';
import { FileService } from '../service/file.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { SysBanner } from '../entity/SysBanner';

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
    @Get('/')
    async getBanner(@Query('banner_[]') classify: string) {
        return ApiResult.ok(
            await this.bannerService.bannerModel.findOne({
                where: { classify: classify },
            })
        );
    }
    @ApiOperation({ summary: '修改指定位置的顶部banner信息' })
    @Post('/')
    @ApiBody({ type: UpdataBannerParam })
    async updateBanner(@Body() updataBannerParam: UpdataBannerParam) {
        const upParam = new SysBanner();
        Object.assign(upParam, updataBannerParam); // 复制值给对象参数。
        return await this.bannerService.bannerModel.save(upParam);
    }
}
