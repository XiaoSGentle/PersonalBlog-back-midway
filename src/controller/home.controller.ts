import { Controller, Get, Inject } from '@midwayjs/core';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { GetNoteParam } from '../dto/note/GetNoteParam';
import { ProverbEnums } from '../enum/FunEnums';
import { BannerService } from '../service/banner.service';
import { DictService } from '../service/dict.service';
import { NoteService } from '../service/note.service';
import { ProverbSerice } from '../service/proverb.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { Author } from '../decorator';

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
    @Get('/', { description: '获取主页数据' })
    @Author([''])
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
}
