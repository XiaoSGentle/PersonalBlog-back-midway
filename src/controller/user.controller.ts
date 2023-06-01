import { Body, Controller, Get, Inject, Post, httpError } from '@midwayjs/core';
import { InfoService } from '@midwayjs/info';
import { Context } from '@midwayjs/koa';
import { ApiBody, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { CerateUserParam } from '../dto/user/CreateUserParam';
import { LoginParam } from '../dto/user/LoginParam';
import { UserService } from '../service/user.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { JwtUtil } from '../util/Jwt/Jwt';

@ApiTags('用户')
@Controller('/')
export class APIController {
    @Inject()
    ctx: Context;

    @Inject()
    userService: UserService;

    @Inject()
    infoService: InfoService;

    @Inject()
    jwtUtil: JwtUtil;

    @ApiOperation({ summary: '用户登录' })
    @Post('/Login')
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

    @ApiOperation({ summary: '用户创建' })
    @Post('/addUser')
    @ApiBody({
        type: CerateUserParam,
    })
    async addUser(@Body() user: CerateUserParam): Promise<ApiResult> {
        const result = await this.userService.Login(user);
        return ApiResult.ok(result);
    }

    @ApiOperation({ summary: '测试专用' })
    @Get('/test')
    async test() {
        throw new httpError.UnauthorizedError();
        // jwt 测试
        // const re = await this.jwtUtil.jwtSign({ uuid: '10000' });
        // log(await this.jwtUtil.jwtVerify(re));
        // return {
        //     验证结果: this.jwtUtil.jwtVerify(re),
        //     解析结果: this.jwtUtil.jwtDecode(re),
        // };
    }
}
