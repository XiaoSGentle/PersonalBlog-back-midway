import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { Context } from 'koa';
import { BannerService } from '../service/banner.service';
import { NoteService } from '../service/note.service';
import { PhotoService } from '../service/photo.service';
import { ApiResult } from '../util/ApiResult/ApiResult';

@ApiBearerAuth()
@ApiTags('相册')
@Controller('/pic')
export class PicController {
    @Inject()
    ctx: Context;

    @Inject()
    noteService: NoteService;

    @Inject()
    bannerService: BannerService;

    @Inject()
    photoService: PhotoService;
    @ApiOperation({ summary: '根据分类随机获取照片' })
    @Get('/', { description: '根据分类随机获取照片' })
    async getPicsByPos(
        @Query('pic_grourment,pic_view,pic_about_me') classify: string
    ) {
        return ApiResult.ok(
            await this.photoService.photoModel.find({
                where: { classify: classify, isShow: 1 },
            })
        );
    }
}
