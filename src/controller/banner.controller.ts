import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@midwayjs/swagger';
import { Context } from 'koa';
import { UpdataBannerParam } from '../dto/banner/UpdataBannerParam';
import { SysBanner } from '../entity/SysBanner';
import { BannerService } from '../service/banner.service';
import { FileService } from '../service/file.service';
import { ApiResult } from '../util/ApiResult/ApiResult';

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
    @Post('/')
    @ApiBody({ type: UpdataBannerParam })
    async updateBanner(@Body() updataBannerParam: UpdataBannerParam) {
        const upParam = new SysBanner();
        Object.assign(upParam, updataBannerParam); // 复制值给对象参数。

        return (await this.bannerService.bannerModel.save(upParam))
            ? ApiResult.upStatus(true)
            : ApiResult.upStatus(false);
    }
}
