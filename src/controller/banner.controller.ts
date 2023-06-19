import { Controller, Get, Inject, Query } from '@midwayjs/core';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@midwayjs/swagger';
import { Context } from 'koa';
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
    @Get('/', { description: '功能:轮播:获取指定位置的顶部banner信息' })
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
}
