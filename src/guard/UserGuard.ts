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
        const resourse = ctx.URL.pathname + '::' + ctx.method.toLowerCase();
        const uuid = ctx.user.uuid;
        // log(resourse);
        // log(uuid);
        const re = await this.casbinEnforcerService.enforce(
            uuid,
            resourse,
            'true'
        );
        // log(re);
        return re;
    }
}
