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
import { Context } from '@midwayjs/koa';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@midwayjs/swagger';
import { UpdateNoteParam } from '../dto/note/UpdateNoteParam';
import { GetNoteParam } from '../dto/note/GetNoteParam';
import { NoteService } from '../service/note.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { AddNoteParam } from '../dto/note/AddNoteParam';

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
     * @returns ApiResult
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
    @ApiBody({
        type: AddNoteParam,
    })
    async addNote(@Body() addNoteParam: AddNoteParam) {
        return ApiResult.ok(await this.noteService.addNote(addNoteParam));
    }
    /**
     * 更新笔记
     * @param param CreateParam
     * @returns ApiResult
     */
    @ApiOperation({ summary: '更新笔记' })
    @Put('/')
    @ApiBody({
        type: UpdateNoteParam,
    })
    async updateNote(@Body() param: UpdateNoteParam) {
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
    /**
     * 获取登录用户的笔记
     * @returns 结果
     */
    @ApiOperation({ summary: '获取登录用户的笔记' })
    @Get('/user')
    async getNotesByUser() {
        return ApiResult.ok(await this.noteService.getAllNoteByUser());
    }
    /**
     * 获取登录用户的笔记
     * @returns 结果
     */
    @ApiOperation({ summary: '根据uuid删除笔记' })
    @Del('/:uuid')
    async delNoteByUuid(@Param('uuid') uuid: string) {
        return (await this.noteService.noteModel.delete(uuid)).affected > 0
            ? ApiResult.delStatus(true)
            : ApiResult.delStatus(false); // 如果删除成功，返回成功的响
    }
}
