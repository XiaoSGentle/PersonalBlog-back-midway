import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@midwayjs/swagger';
import { UpdateUserInfoParam } from '../dto/home/UpdateUserInfoParam';
import { BannerEnums } from '../enum/FunEnums';
import { BannerService } from '../service/banner.service';
import { DictService } from '../service/dict.service';
import { NoteService } from '../service/note.service';
import { ProverbSerice } from '../service/proverb.service';
import { ApiResult } from '../util/ApiResult/ApiResult';

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
    @Get('/blogInfo')
    async getBlogInfo() {
        return ApiResult.ok(await this.dictService.getBlogInfo());
    }

    @ApiOperation({ summary: '修改网站主页信息' })
    @Post('/blogInfo')
    @ApiBody({
        type: UpdateUserInfoParam,
    })
    async setBlogInfo(@Body() userInfo: UpdateUserInfoParam) {
        return this.dictService.setBlogInfo(userInfo)
            ? ApiResult.upStatus(true)
            : ApiResult.upStatus(false);
    }

    @ApiOperation({ summary: '获取首页所有可以随机的背景图' })
    @Get('/allBgPic')
    async getAllBgPic() {
        return ApiResult.ok(
            await this.bannerService.getAllBgPic(BannerEnums.HOME)
        );
    }
    @ApiOperation({ summary: '获取首页所有可以随机的名言' })
    @Get('/allSaying')
    @ApiParam({
        name: 'classify',
        example: 'saying,myself',
    })
    async allSaying(@Query('classify') classify: string) {
        return ApiResult.ok(await this.proverbService.getAllSaying(classify));
    }
}
