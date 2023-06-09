import { Controller, Del, Inject, Param } from '@midwayjs/core';
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
    @Del('/:uuid')
    async delMessage(@Param('uuid') param: string) {
        return ApiResult.ok(
            await this.messageService.messageModel.softDelete(param)
        );
    }
}
