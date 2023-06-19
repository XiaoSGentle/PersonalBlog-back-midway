import { Controller, Get, Inject } from '@midwayjs/core';
import { InfoService } from '@midwayjs/info';
import { Context } from '@midwayjs/koa';
import { ApiOperation, ApiTags } from '@midwayjs/swagger';
import { DictService } from '../service/dict.service';
import { UserService } from '../service/user.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { JwtUtil } from '../util/Jwt/Jwt';

@ApiTags('管理员:用户')
@Controller('/admin/user')
export class UserController {
    @Inject()
    ctx: Context;

    @Inject()
    userService: UserService;

    @Inject()
    infoService: InfoService;

    @Inject()
    jwtUtil: JwtUtil;

    @Inject()
    dictService: DictService;

    @ApiOperation({ summary: '获取所有用户' })
    @Get('/', { description: '获取所有用户' })
    async getAllUser(): Promise<ApiResult> {
        const result = await this.userService.userModel.find();
        return ApiResult.ok(result);
    }
    @ApiOperation({ summary: '测试专用' })
    @Get('/test', { description: '测试专用' })
    async test() {
        this.dictService.getBlogInfo();
    }
}
