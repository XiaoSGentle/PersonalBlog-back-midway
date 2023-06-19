import { CasbinEnforcerService } from '@midwayjs/casbin';
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
import { AuthorityService } from '../service/authority.service';

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
    casbinEnforcerService: CasbinEnforcerService;

    @Inject()
    infoService: InfoService;
    @Inject()
    authorityService: AuthorityService;

    @Inject()
    jwtUtil: JwtUtil;

    @Inject()
    dictService: DictService;

    @ApiOperation({ summary: '用户登录' })
    @Post('/Login', { description: '功能:用户:用户登录' })
    @ApiBody({
        type: LoginParam,
    })
    async Login(@Body() user: LoginParam): Promise<ApiResult> {
        return await this.userService.Login(user);
    }
    @AddStatisticsNum(StatisticsEnums.SING_IN)
    @ApiOperation({ summary: '用户创建' })
    @Post('/addUser', { description: '功能:用户:用户注册' })
    @ApiBody({
        type: CerateUserParam,
    })
    async addUser(@Body() user: CerateUserParam): Promise<ApiResult> {
        const result = await this.userService.Login(user);
        return ApiResult.ok(result);
    }

    @ApiOperation({ summary: '权限获取' })
    @Get('/getAuthority', { description: '功能:用户:获取登陆用户的权限' })
    async getAuthority(ctx: Context) {
        return ApiResult.ok(
            await this.authorityService.getAuthorityByUuid(ctx.user.uuid)
        );
    }
}
