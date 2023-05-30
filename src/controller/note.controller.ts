import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import {
    ApiBasicAuth,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@midwayjs/swagger';
import { AddOrUpdateNoteParam } from '../dto/note/AddOrUpdateNoteParam';
import { GetNoteParam } from '../dto/note/GetNoteParam';
import { NoteService } from '../service/note.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { Pageparam } from '../util/Page/PageParam';

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

    @ApiOperation({ summary: '根据UUID获取笔记详情' })
    @Get('/getNotesByUuid')
    async getNotesByUuid(@Query('uuid') uuid: string) {
        const re = await this.noteService.noteModel.findOne({
            where: { uuid: uuid },
        });
        // 添加阅读次数
        re.readNum = re.readNum++;
        this.noteService.noteModel.save(re);
        return ApiResult.ok(re);
    }

    /**
     * 新增笔记
     * @param param CreateParam
     * @returns ApiResult
     */
    @ApiOperation({ summary: '新增笔记' })
    @Get('/addNote')
    async addNote(@Query('createUuid') createUuid: string) {
        return ApiResult.ok(await this.noteService.addNote(createUuid));
    }
    /**
     * 更新笔记
     * @param param CreateParam
     * @returns ApiResult
     */
    @ApiOperation({ summary: '更新笔记' })
    @Post('/updateNote')
    @ApiBody({
        type: AddOrUpdateNoteParam,
    })
    async updateNote(@Body() param: AddOrUpdateNoteParam) {
        return ApiResult.ok(this.noteService.updateNote(param));
    }
    /**
     * 获取所有笔记
     * @param pageParam 分页参数
     * @returns 结果
     */
    @ApiOperation({ summary: '获取笔记' })
    @Post('/getAllNote')
    @ApiBody({
        type: Pageparam,
    })
    async getAllMessage(@Body() pageParam: Pageparam) {
        return ApiResult.ok(await this.noteService.getAllNote(pageParam));
    }
    /**
     * 获取所有笔记分类标签
     * @returns 结果
     */
    @ApiOperation({ summary: '获取笔记分类标签' })
    @Get('/getAllNoteClassify')
    async getAllNoteClassify() {
        return ApiResult.ok(await this.noteService.getAllNoteClassify());
    }
}
