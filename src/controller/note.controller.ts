import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiTags
} from '@midwayjs/swagger';
import { AddOrUpdateNoteParam } from '../dto/note/AddOrUpdateNoteParam';
import { GetNoteParam } from '../dto/note/GetNoteParam';
import { NoteService } from '../service/note.service';
import { ApiResult } from '../util/ApiResult/ApiResult';

@ApiBearerAuth()
@ApiTags('笔记')
@Controller('/note')
export class NoteController {
    @Inject()
    ctx: Context;

    @Inject()
    noteService: NoteService;

    /**
     * 获取笔记详情
     * @param uuid 笔记uuid
     * @returns 
     */
    @ApiOperation({ summary: '获取笔记详情' })
    @Get('/:uuid')
    async getNotesByUuid(@Param('uuid') uuid: string) {
        const re = await this.noteService.noteModel.findOne({
            where: { uuid: uuid },
        });
        // 添加阅读次数
        re.readNum = re.readNum + 1;
        await this.noteService.noteModel.save(re);
        return ApiResult.ok(re);
    }

    /**
     * 新增笔记
     * @param param CreateParam
     * @returns ApiResult
     */
    @ApiOperation({ summary: '新增笔记' })
    @Post('/')
    async addNote(@Query('createUuid') createUuid: string) {
        return ApiResult.ok(await this.noteService.addNote(createUuid));
    }
    /**
     * 更新笔记
     * @param param CreateParam
     * @returns ApiResult
     */
    @ApiOperation({ summary: '更新笔记' })
    @Put('/')
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
    @ApiOperation({ summary: '获取笔记列表' })
    @Get('/all')
    @ApiBody({
        type: GetNoteParam,
    })
    async getAllMessage(@Query() param: GetNoteParam) {
        return ApiResult.ok(await this.noteService.getAllNote(param));
    }
    /**
     * 获取所有笔记分类标签
     * @returns 结果
     */
    @ApiOperation({ summary: '获取笔记分类标签' })
    @Get('/classify')
    async getAllNoteClassify() {
        return ApiResult.ok(await this.noteService.getAllNoteClassify());
    }
}
