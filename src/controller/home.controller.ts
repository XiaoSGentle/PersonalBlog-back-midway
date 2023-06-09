import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@midwayjs/swagger';
import { UpdateUserInfoParam } from '../dto/home/UpdateUserInfoParam';
import { GetNoteParam } from '../dto/note/GetNoteParam';
import { ProverbEnums } from '../enum/FunEnums';
import { BannerService } from '../service/banner.service';
import { DictService } from '../service/dict.service';
import { NoteService } from '../service/note.service';
import { ProverbSerice } from '../service/proverb.service';
import { ApiResult } from '../util/ApiResult/ApiResult';

@ApiBearerAuth()
@ApiTags('主页')
@Controller('/home')
export class HomeController {
    @Inject()
    noteService: NoteService;

    @Inject()
    proverbService: ProverbSerice;

    @Inject()
    dictService: DictService;

    @Inject()
    bannerService: BannerService;

    /**
     *  获取主页面的数据
     * @returns 主页数据
     */
    @ApiOperation({ summary: '获取主页数据' })
    @Get('/')
    async index() {
        const homeInfoVo = {
            banner: {
                bgImg: '',
                name: '',
                content: '',
            },
            proverb1: {},
            proverb2: {},
            note1: [],
            note2: [],
        };
        const userInfo: any = await this.dictService.getBlogInfo();
        Object.assign(homeInfoVo.banner, userInfo);
        homeInfoVo.banner.bgImg = await this.bannerService.getHomeBanner();
        // 获取名言
        homeInfoVo.proverb1 = await this.proverbService.getProverb(
            ProverbEnums.SAYING
        );
        homeInfoVo.proverb2 = await this.proverbService.getProverb(
            ProverbEnums.MYSELF
        );
        // 获取三四板块的笔记
        const param = new GetNoteParam();
        param.pageNum = 1;
        param.pageSize = 4;
        homeInfoVo.note1 = (await this.noteService.getAllNote(param)).data;
        param.pageSize = 6;
        homeInfoVo.note2 = (await this.noteService.getAllNote(param)).data;
        return ApiResult.ok(homeInfoVo);
    }

    @ApiOperation({ summary: '获取网站主页信息' })
    @Get('/blogInfo')
    async getUserInfo() {
        return ApiResult.ok(await this.dictService.getBlogInfo());
    }

    @ApiOperation({ summary: '修改网站主页信息' })
    @Post('/blogInfo')
    @ApiBody({
        type: UpdateUserInfoParam,
    })
    async setBlogInfo(@Body() userInfo: UpdateUserInfoParam) {
        (await this.dictService.setBlogInfo(userInfo))
            ? ApiResult.upStatus(true)
            : ApiResult.upStatus(false);
    }
}
