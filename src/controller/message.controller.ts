import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiBody, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { addMessageParam } from '../dto/message/addMessageParam';
import { MessageService } from '../service/message.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { Pageparam } from '../util/Page/PageParam';

@ApiTags('留言')
@Controller('/message')
export class MessageController {
    @Inject()
    ctx: Context;

    @Inject()
    messageService: MessageService;

    @ApiOperation({ summary: '获取所有留言' })
    @Post('/getAllMessage')
    @ApiBody({
        type: Pageparam,
    })
    async getAllMessage(@Body() pageParam: Pageparam) {
        return ApiResult.ok(await this.messageService.getAllMessage(pageParam));
    }
    /**
     * 添加留言
     * @param pageParam
     * @returns
     */
    @ApiOperation({ summary: '添加留言' })
    @Post('/addMessage')
    @ApiBody({
        type: addMessageParam,
    })
    async addMessage(@Body() funMessage: addMessageParam) {
        return ApiResult.ok(await this.messageService.save(funMessage));
    }
}
