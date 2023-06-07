import { Controller, Get, Inject } from '@midwayjs/core';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { NoteService } from '../service/note.service';
import { ProverbSerice } from '../service/proverb.service';
import { GetNoteParam } from '../dto/note/GetNoteParam';

@ApiBearerAuth()
@ApiTags('主页')
@Controller('/home')
export class HomeController {
    @Inject()
    noteService: NoteService;

    @Inject()
    proverbService: ProverbSerice;

    /**
     *  获取主页面的数据
     * @returns 主页数据
     */
    @ApiOperation({ summary: '获取主页数据' })
    @Get('/')
    async index() {
        const result = {
            proverb1: {},
            proverb2: {},
            note1: [],
            note2: [],
        };
        result.proverb1 = await this.proverbService.getProverb(1);
        result.proverb2 = await this.proverbService.getProverb(2);
        const param = new GetNoteParam();
        param.pageNum = 1;
        param.pageSize = 4;
        result.note1 = (await this.noteService.getAllNote(param)).data;
        param.pageSize = 6;
        result.note2 = (await this.noteService.getAllNote(param)).data;
        return ApiResult.ok(result);
    }
}
