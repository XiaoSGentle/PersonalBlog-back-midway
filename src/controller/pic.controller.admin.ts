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
    ApiParam,
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
    @Get('/classify', { description: '根据分类获取照片' })
    @ApiParam({
        name: 'classify',
        example: 'pic_grourment,pic_view,pic_about_me',
    })
    async getPicsByPos(@Query('classify') classify: string) {
        return ApiResult.ok(
            await this.photoService.photoModel.find({
                where: { classify: classify },
            })
        );
    }
    @ApiOperation({ summary: '根据uuid获取照片' })
    @Get('/:uuid', { summary: '根据uuid获取照片' })
    async getPicsByUUID(@Param('uuid') uuid: string) {
        return ApiResult.ok(
            await this.photoService.photoModel.findOne({
                where: { uuid: uuid },
            })
        );
    }

    @ApiOperation({ summary: '根据uuid删除照片' })
    @Del('/:uuid', { description: '根据uuid删除照片' })
    async delPicsByPos(@Param('uuid') uuid: string) {
        return (await this.photoService.photoModel.delete(uuid)).affected > 0
            ? ApiResult.delStatus(true)
            : ApiResult.delStatus(false);
    }
    @ApiOperation({ summary: '改变照片的展示状态' })
    @Put('/show/:uuid', { description: '根据uuid改变该照片的显示状态' })
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
    @Put('/', { description: '根据参数更新照片' })
    @ApiBody({ type: UpdatePhotoParam })
    async updatePicInfo(@Body() updatePhotoParam: UpdatePhotoParam) {
        const updateParam = new FunPhoto();
        Object.assign(updateParam, updatePhotoParam);
        updateParam.updateTime = TimeUtil.GetNowTime();
        return (await this.photoService.photoModel.save(updateParam))
            ? ApiResult.upStatus(true)
            : ApiResult.upStatus(false);
    }

    @ApiOperation({ summary: '添加照片' })
    @Post('/', { description: '添加照片' })
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
