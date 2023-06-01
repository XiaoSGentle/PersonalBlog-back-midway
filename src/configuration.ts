import * as casbin from '@midwayjs/casbin';
import {
    App,
    Configuration,
    Inject,
    MidwayDecoratorService,
} from '@midwayjs/core';
import * as cos from '@midwayjs/cos';
import * as crossDomain from '@midwayjs/cross-domain';
import * as info from '@midwayjs/info';
import * as jwt from '@midwayjs/jwt';
import * as koa from '@midwayjs/koa';
import * as passport from '@midwayjs/passport';
import * as swagger from '@midwayjs/swagger';
import * as typeorm from '@midwayjs/typeorm';
import * as upload from '@midwayjs/upload';
import * as validate from '@midwayjs/validate';
import { join } from 'path';
import {
    TokenExpiredFilter,
    UnauthorizedFilter,
} from './filter/identity.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ValidateErrorFilter } from './filter/validate.filter';
import { UserGuard } from './guard/UserGuard';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
    imports: [
        koa,
        typeorm,
        swagger,
        validate,
        cos,
        passport,
        casbin,
        jwt,
        upload,
        crossDomain,
        {
            component: info,
            enabledEnvironment: ['local'],
        },
    ],
    importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
    @App()
    app: koa.Application;

    @Inject()
    decoratorService: MidwayDecoratorService;

    async onReady() {
        // 使用中间件
        this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
        // 使用过滤器
        this.app.useFilter([
            NotFoundFilter,
            ValidateErrorFilter,
            TokenExpiredFilter,
            UnauthorizedFilter,
        ]);
        // 使用管道
        this.app.useGuard(UserGuard);
    }
}
