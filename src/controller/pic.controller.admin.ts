import {
    Body,
    Controller,
    Del,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Query,
} from '@midwayjs/core';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@midwayjs/swagger';
import { Context } from 'koa';
import { AddPhotoParam } from '../dto/photo/AddPhotoParam';
import { UpdatePhotoParam } from '../dto/photo/UpdatePhotoParam';
import { FunPhoto } from '../entity/FunPhoto';
import { BannerService } from '../service/banner.service';
import { NoteService } from '../service/note.service';
import { PhotoService } from '../service/photo.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { TimeUtil, getUUID } from '../util/Other/Utils';

@ApiBearerAuth()
@ApiTags('管理员:相册')
@Controller('/admin/pic')
export default class AdminPicController {
    @Inject()
    ctx: Context;

    @Inject()
    noteService: NoteService;

    @Inject()
    bannerService: BannerService;

    @Inject()
    photoService: PhotoService;

    @ApiOperation({ summary: '根据分类获取所有照片' })
    @Get('/')
    async getPicsByPos(
        @Query('pic_grourment,pic_view,pic_about_me') classify: string
    ) {
        return ApiResult.ok(
            await this.photoService.photoModel.find({
                where: { classify: classify },
            })
        );
    }

    @ApiOperation({ summary: '根据uuid删除照片' })
    @Del('/:uuid')
    async delPicsByPos(@Param('uuid') uuid: string) {
        return (await this.photoService.photoModel.delete(uuid)).affected > 0
            ? ApiResult.delStatus(true)
            : ApiResult.delStatus(false);
    }
    @ApiOperation({ summary: '改变照片的展示状态' })
    @Put('/show/:uuid')
    async updatePicShowStatus(@Param('uuid') uuid: string) {
        const reSql: FunPhoto = await this.photoService.photoModel.findOne({
            where: { uuid: uuid },
        });
        reSql.isShow === 1 ? (reSql.isShow = 0) : (reSql.isShow = 1);
        return (await this.photoService.photoModel.save(reSql))
            ? ApiResult.upStatus(true)
            : ApiResult.upStatus(false);
    }

    @ApiOperation({ summary: '更新照片' })
    @Put('/')
    @ApiBody({ type: UpdatePhotoParam })
    async updatePicInfo(@Body() updatePhotoParam: UpdatePhotoParam) {
        const updateParam = new FunPhoto();
        Object.assign(updateParam, updatePhotoParam);
        updateParam.updateTime = TimeUtil.GetNowTime();
        return ApiResult.ok(
            await this.photoService.photoModel.save(updateParam)
        );
    }

    @ApiOperation({ summary: '添加照片' })
    @Post('/')
    @ApiBody({ type: AddPhotoParam })
    async addPicInfo(@Body() AddPhotoParam: AddPhotoParam) {
        const addParam = this.createNewPhoto(AddPhotoParam);
        const reSql = await this.photoService.photoModel.insert(addParam);
        return reSql.raw.affectedRows > 0
            ? ApiResult.addStatus(true)
            : ApiResult.addStatus(false);
    }

    private createNewPhoto(AddPhotoParam: AddPhotoParam) {
        const addParam = new FunPhoto();
        Object.assign(addParam, AddPhotoParam);
        addParam.updateTime = TimeUtil.GetNowTime();
        addParam.createTime = TimeUtil.GetNowTime();
        addParam.uuid = getUUID();
        return addParam;
    }
}
