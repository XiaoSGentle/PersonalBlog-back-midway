import { App, Configuration } from '@midwayjs/core';
import * as cos from '@midwayjs/cos';
import * as crossDomain from '@midwayjs/cross-domain';
import * as info from '@midwayjs/info';
import * as jwt from '@midwayjs/jwt';
import * as koa from '@midwayjs/koa';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/typeorm';
import * as upload from '@midwayjs/upload';
import * as validate from '@midwayjs/validate';
import { join } from 'path';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { ReportMiddleware } from './middleware/report.middleware';

import { NotFoundFilter } from './filter/notfound.filter';
import { ValidateErrorFilter } from './filter/validate.filter';
import { UnauthorizedFilter } from './filter/identity.filter';

@Configuration({
    imports: [
        koa,
        orm,
        swagger,
        validate,
        cos,
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

    async onReady() {
        this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
        this.app.useFilter([
            UnauthorizedFilter,
            NotFoundFilter,
            ValidateErrorFilter,
        ]);
    }
}
