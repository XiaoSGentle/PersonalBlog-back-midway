import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { LogService } from '../service/log.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { Pageparam } from '../util/Page/PageParam';

@ApiBearerAuth()
@ApiTags('管理员:日志')
@Controller('/admin/log')
export class AdminLogController {
    @Inject()
    logService: LogService;

    @ApiOperation({ summary: '获取所有日志信息' })
    @Get('/', { description: '获取所有日志信息' })
    async getLogs(@Query() pageParam: Pageparam) {
        return ApiResult.ok(await this.logService.getSysLogs(pageParam));
    }
}
