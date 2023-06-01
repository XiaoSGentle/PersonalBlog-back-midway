// src/middleware/jwt.middleware

import { Inject, Middleware, httpError } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { AuthenticateOptions, PassportMiddleware } from '@midwayjs/passport';
import { UserService } from '../service/user.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { JwtUtil } from '../util/Jwt/Jwt';

@Middleware()
export class JwtMiddleware extends PassportMiddleware(JwtStrategy) {
    @Inject()
    jwtUtil: JwtUtil;

    @Inject()
    userService: UserService;

    public static getName(): string {
        return 'jwt';
    }

    getAuthenticateOptions():
        | AuthenticateOptions
        | Promise<AuthenticateOptions> {
        return {};
    }
    resolve() {
        return async (ctx: Context, next: NextFunction) => {
            // 判断下有没有校验信息
            if (!ctx.headers['authorization']) {
                throw new httpError.UnauthorizedError();
            }
            // 从 header 上获取校验信息
            const parts = ctx.get('authorization').trim().split(' ');

            if (parts.length !== 2) {
                throw new httpError.UnauthorizedError();
            }

            const [scheme, token] = parts;

            if (/^Bearer$/i.test(scheme)) {
                const JWTInfo = await this.jwtUtil.jwtVerify(token);
                const userInfoInSql = await this.userService.userModel.findOne({
                    where: {
                        uuid: JWTInfo.uuid,
                    },
                });
                ctx.user = userInfoInSql;
                await next();
            }
        };
    }
    // 配置忽略鉴权的路由地址
    public match(ctx: Context): boolean {
        const ignore = ctx.path.indexOf('/api/Login') !== -1;
        return !ignore;
    }
}
