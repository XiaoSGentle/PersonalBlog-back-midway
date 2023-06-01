import {
    Body,
    Controller,
    Del,
    Get,
    Inject,
    Param,
    Post,
    Query,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@midwayjs/swagger';
import { addMessageParam } from '../dto/message/addMessageParam';
import { MessageService } from '../service/message.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { Pageparam } from '../util/Page/PageParam';

@ApiBearerAuth()
@ApiTags('留言')
@Controller('/message')
export class MessageController {
    @Inject()
    ctx: Context;

    @Inject()
    messageService: MessageService;

    /**
     * 分页获取所有留言
     * @param pageParam 分页参数
     * @returns 分页结果
     */
    @ApiOperation({ summary: '获取所有留言' })
    @Get('/all')
    @ApiBody({
        type: Pageparam,
    })
    async getMessage(@Query() pageParam: Pageparam) {
        return ApiResult.ok(await this.messageService.getAllMessage(pageParam));
    }

    /**
     * 添加留言
     * @param pageParam
     * @returns
     */
    @ApiOperation({ summary: '添加留言' })
    @Post('')
    @ApiBody({
        type: addMessageParam,
    })
    async addMessage(@Body() param: addMessageParam) {
        return ApiResult.ok(await this.messageService.save(param));
    }
    /**
     * 删除留言
     * @param pageParam
     * @returns
     */
    @ApiOperation({ summary: '删除留言' })
    @Del('/:uuid')
    async delMessage(@Param('uuid') param: string) {
        return ApiResult.ok(
            await this.messageService.messageModel.softDelete([param])
        );
    }
    /**
     * 删除留言
     * @param pageParam
     * @returns
     */
    @ApiOperation({ summary: '获取留言详情' })
    @Get('/:uuid')
    async getAllMessage(@Param('uuid') param: string) {
        return ApiResult.ok();
    }
}
