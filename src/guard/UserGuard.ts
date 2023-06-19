import { CasbinEnforcerService } from '@midwayjs/casbin';
import { Guard, IGuard, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Guard()
export class UserGuard implements IGuard<Context> {
    @Inject()
    casbinEnforcerService: CasbinEnforcerService;

    async canActivate(
        ctx: Context,
        clz: any,
        methodName: string
    ): Promise<boolean> {
        if (methodName === 'Login') return true;
        const router = ctx.originalUrl.split('?')[0] + '::' + ctx.method;
        // error(router);
        return this.casbinEnforcerService.enforce(
            ctx.user.uuid,
            router,
            ctx.method
        );
    }
}
