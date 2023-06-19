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
import { UpdateUserInfoParam } from '../dto/home/UpdateUserInfoParam';
import { AddProverParam } from '../dto/proverb/AddpProverParam';
import { UpProverParam } from '../dto/proverb/UpProverParam';
import { FunHome } from '../entity/FunHome';
import { BannerEnums } from '../enum/FunEnums';
import { BannerService } from '../service/banner.service';
import { DictService } from '../service/dict.service';
import { NoteService } from '../service/note.service';
import { ProverbSerice } from '../service/proverb.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { TimeUtil, getUUID } from '../util/Other/Utils';

@ApiBearerAuth()
@ApiTags('管理员:主页')
@Controller('/admin/home')
export class HomeController {
    @Inject()
    noteService: NoteService;

    @Inject()
    proverbService: ProverbSerice;

    @Inject()
    dictService: DictService;

    @Inject()
    bannerService: BannerService;

    @ApiOperation({ summary: '获取网站主页信息' })
    @Get('/blogInfo', { description: '获取网站主页信息' })
    async getBlogInfo() {
        return ApiResult.ok(await this.dictService.getBlogInfo());
    }

    @ApiOperation({ summary: '修改网站主页信息' })
    @Put('/blogInfo', { description: '修改网站主页信息' })
    @ApiBody({
        type: UpdateUserInfoParam,
    })
    async setBlogInfo(@Body() userInfo: UpdateUserInfoParam) {
        return this.dictService.setBlogInfo(userInfo)
            ? ApiResult.upStatus(true)
            : ApiResult.upStatus(false);
    }

    @ApiOperation({ summary: '获取首页所有可以随机的背景图' })
    @Get('/allBgPic', { description: '获取首页所有可以随机的背景图' })
    async getAllBgPic() {
        return ApiResult.ok(
            await this.bannerService.getAllBgPic(BannerEnums.HOME)
        );
    }
    @ApiOperation({ summary: '获取首页所有可以随机的名言' })
    @Get('/allSaying', { description: '获取首页所有可以随机的名言' })
    @ApiParam({
        name: 'classify',
        example: 'saying,myself',
    })
    async allSaying(@Query('classify') classify: string) {
        return ApiResult.ok(await this.proverbService.getAllSaying(classify));
    }
    @ApiOperation({ summary: '修改名言信息' })
    @Put('/saying', { description: '修改名言信息' })
    @ApiBody({ type: UpProverParam })
    async updateBanner(@Body() upProverParam: UpProverParam) {
        const upParam = new FunHome();
        Object.assign(upParam, upProverParam);
        upParam.updateTime = TimeUtil.GetNowTime();
        return (await this.proverbService.homeModel.save(upParam))
            ? ApiResult.upStatus(true)
            : ApiResult.upStatus(false);
    }

    @ApiOperation({ summary: '上传一条名言' })
    @Post('/saying', { description: '上传一条名言' })
    @ApiBody({ type: AddProverParam })
    async upLoadHomeBanner(@Body() addProverParam: AddProverParam) {
        const addParam = new FunHome();
        Object.assign(addParam, addProverParam);
        addParam.uuid = getUUID();
        addParam.updateTime = TimeUtil.GetNowTime();
        addParam.createTime = TimeUtil.GetNowTime();
        return (await this.proverbService.homeModel.save(addParam))
            ? ApiResult.addStatus(true)
            : ApiResult.addStatus(false);
    }

    @ApiOperation({ summary: '删除一条名言' })
    @Del('/saying', { description: '删除一条名言' })
    async delSaying(@Query('uuid') uuid: string) {
        return ApiResult.delStatus(
            (await this.proverbService.homeModel.delete(uuid)) ? true : false
        );
    }
    @ApiOperation({ summary: '获取一条名言' })
    @Get('/saying', { description: '获取一条名言' })
    async getSaying(@Query('uuid') uuid: string) {
        return ApiResult.ok(
            await this.proverbService.homeModel.findOne({
                where: { uuid: uuid },
            })
        );
    }
}
