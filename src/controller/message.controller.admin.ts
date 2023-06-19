import { Controller, Del, Inject, Query } from '@midwayjs/core';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { MessageService } from '../service/message.service';
import { ApiResult } from '../util/ApiResult/ApiResult';

@ApiBearerAuth()
@ApiTags('管理员:留言')
@Controller('/admin/message')
export class AdminMessageController {
    @Inject()
    messageService: MessageService;
    /**
     * 删除留言
     * @param pageParam
     * @returns
     */
    @ApiOperation({ summary: '删除留言' })
    @Del('/', { description: '管理员:留言:根据uuid删除留言' })
    async delMessage(@Query('uuid') param: string) {
        return (await this.messageService.messageModel.delete(param)).affected >
            0
            ? ApiResult.delStatus(true)
            : ApiResult.delStatus(false);
    }
}
