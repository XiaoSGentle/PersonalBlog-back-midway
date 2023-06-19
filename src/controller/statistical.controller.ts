import { Controller, Get, Inject } from '@midwayjs/core';
import { InfoService } from '@midwayjs/info';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { DictService } from '../service/dict.service';

@ApiBearerAuth()
@ApiTags('管理员:面板')
@Controller('/admin/statis')
export class AdminStatisticalController {
    @Inject()
    inforService: InfoService;

    @Inject()
    dictService: DictService;

    @ApiOperation({ summary: '获取服务器的运行信息' })
    @Get('/sys', { description: '管理员:统计:获取服务器的运行信息' })
    async getSysInfo() {
        const os = require('os');
        const ramUsage = 1 - os.freemem() / os.totalmem();
        // 计算cpu占用
        let cpuTotal = 0;
        const cpuUsage = this.inforService
            .resourceOccupationInfo()
            .info['CPU Usage'].toString()
            .replace('%', '')
            .split(' / ');
        cpuUsage.forEach(item => {
            cpuTotal = cpuTotal + parseFloat(item);
        });
        // 先获取信息
        const resource = this.inforService.resourceOccupationInfo().info;
        const system = this.inforService.systemInfo().info;
        // memoryTotalOccupy
        const memoryTotalOccupy =
            ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2) + 'MB';
        const sysInfo = {
            sysInfo: {
                systemTotalMemory: resource['System Total Memory'],
                platform: system['Platform'],
                node: system['Node'],
                memoryTotalOccupy: memoryTotalOccupy,
                heapTotalOccupy: resource['Heap Total Occupy'],
                cpuInfo: resource['CPU'],
                cpuUsage: cpuTotal.toFixed(2),
                ramUsage: (ramUsage * 100).toFixed(2),
            },
            webInfo: await this.dictService.getStaisInfo(),
        };
        return ApiResult.ok(sysInfo);
    }
}
