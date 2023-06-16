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
        // const a = await this.casbinEnforcerService.enforce(
        //     '1',
        //     '/api/pic::get',
        //     '1'
        // );
        // error(a);
        // const re = await this.casbinEnforcerService.enforce(
        //     ctx.user.uuid,
        //     'domain',
        //     'note',
        //     ctx.request.method
        // );
        // log(ctx.user.uuid);
        // log(ctx.request.method);
        // error('re');
        return true;
    }
}
