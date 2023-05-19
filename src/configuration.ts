import { App, Configuration } from '@midwayjs/core';
import * as cos from '@midwayjs/cos';
import * as crossDomain from '@midwayjs/cross-domain';
import * as info from '@midwayjs/info';
import * as koa from '@midwayjs/koa';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/typeorm';
import * as upload from '@midwayjs/upload';
import * as validate from '@midwayjs/validate';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
    imports: [
        koa,
        orm,
        swagger,
        validate,
        cos,
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
        this.app.useMiddleware([ReportMiddleware]);
    }
}
