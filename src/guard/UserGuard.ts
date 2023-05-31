import { CasbinEnforcerService } from '@midwayjs/casbin';
import { Guard, IGuard, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { error } from 'console';

@Guard()
export class UserGuard implements IGuard<Context> {
    @Inject()
    casbinEnforcerService: CasbinEnforcerService;

    async canActivate(ctx: Context, clz: any, methodName: string): Promise<boolean> {
        error(await this.casbinEnforcerService.enforce('bob', 'domain', 'note', 'delete'));
        return true;
    }
}