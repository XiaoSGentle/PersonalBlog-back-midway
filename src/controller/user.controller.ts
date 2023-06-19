import {
    Body,
    Controller,
    Get,
    Inject,
    MidwayWebRouterService,
    Post,
} from '@midwayjs/core';
import { InfoService } from '@midwayjs/info';
import { Context } from '@midwayjs/koa';
import { ApiBody, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { AddStatisticsNum } from '../decorator/statistics.decorator';
import { CerateUserParam } from '../dto/user/CreateUserParam';
import { LoginParam } from '../dto/user/LoginParam';
import { StatisticsEnums } from '../enum/FunEnums';
import { DictService } from '../service/dict.service';
import { UserService } from '../service/user.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { JwtUtil } from '../util/Jwt/Jwt';

@ApiTags('用户')
@Controller('/')
export class UserController {
    @Inject()
    ctx: Context;

    @Inject()
    userService: UserService;

    @Inject()
    webRouterService: MidwayWebRouterService;

    @Inject()
    infoService: InfoService;

    @Inject()
    jwtUtil: JwtUtil;

    @Inject()
    dictService: DictService;

    @ApiOperation({ summary: '用户登录' })
    @Post('/Login', { description: '用户登录' })
    @ApiBody({
        type: LoginParam,
    })
    async Login(@Body() user: LoginParam): Promise<ApiResult> {
        const result = await this.userService.Login(user);
        result.password = '';
        return ApiResult.ok({
            userInfo: result,
            token: await this.jwtUtil.jwtSign({ uuid: result.uuid }),
        });
    }
    @AddStatisticsNum(StatisticsEnums.SING_IN)
    @ApiOperation({ summary: '用户创建' })
    @Post('/addUser', { description: '用户注册' })
    @ApiBody({
        type: CerateUserParam,
    })
    async addUser(@Body() user: CerateUserParam): Promise<ApiResult> {
        const result = await this.userService.Login(user);
        return ApiResult.ok(result);
    }

    @ApiOperation({ summary: '测试专用' })
    @Get('/test', { description: '测试用接口' })
    async test() {
        return '权限通过';
    }
}
