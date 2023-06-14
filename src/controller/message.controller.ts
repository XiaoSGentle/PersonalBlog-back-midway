import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@midwayjs/swagger';

import { AddMessageParam } from '../dto/message/AddMessageParam';
import { MessageService } from '../service/message.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { Pageparam } from '../util/Page/PageParam';
import { AddStatisticsNum } from '../decorator/statistics.decorator';
import { StatisticsEnums } from '../enum/FunEnums';
import { log } from 'console';

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
    @Get('/all', { description: '获取所有留言' })
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
    @AddStatisticsNum(StatisticsEnums.MESSAGE)
    @ApiOperation({ summary: '添加留言' })
    @Post('/', { description: '添加留言' })
    @ApiBody({
        type: AddMessageParam,
    })
    async addMessage(@Body() param: AddMessageParam) {
        log(param);
        return ApiResult.ok(await this.messageService.addMessage(param));
    }
}
