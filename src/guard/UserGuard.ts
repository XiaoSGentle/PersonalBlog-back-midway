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
        await this.casbinEnforcerService.enforce(
            ctx.user.uuid,
            'domain',
            'note',
            ctx.request.method
        );
        return true;
    }
}
