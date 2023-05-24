import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import {
    ApiBasicAuth,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@midwayjs/swagger';
import { CreateNoteParam } from '../dto/note/CreateNoteParam';
import { GetNoteParam } from '../dto/note/GetNoteParam';
import { NoteService } from '../service/note.service';
import { ApiResult } from '../util/ApiResult/ApiResult';

@ApiBasicAuth()
@ApiTags('笔记')
@Controller('/note')
export class NoteController {
    @Inject()
    ctx: Context;

    @Inject()
    noteService: NoteService;

    @ApiOperation({ summary: '按照条件获取笔记' })
    @Post('/getNotes')
    @ApiBody({
        type: GetNoteParam,
    })
    async getNotes(@Body() param: GetNoteParam) {
        return ApiResult.ok(await this.noteService.getNoteList(param));
    }
    /**
     * 添加
     * @param param CreateNoteParam
     * @returns NoteList
     */
    @ApiOperation({ summary: '添加笔记' })
    @Post('/addOrUpdateNote')
    @ApiBody({
        type: CreateNoteParam,
    })
    async addOrUpdateNote(@Body() param: CreateNoteParam) {
        return ApiResult.ok(await this.noteService.addOrUpdateNote(param));
    }
}
