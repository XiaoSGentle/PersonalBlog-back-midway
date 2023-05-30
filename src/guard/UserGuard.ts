import { CasbinEnforcerService } from '@midwayjs/casbin';
import { Guard, IGuard, Inject } from '@midwayjs/core';

@Guard()
export class UserGuard implements IGuard {
    @Inject()
    casbinEnforcerService: CasbinEnforcerService;

    async canActivate(ctx, clz, methodName) {
        // 用户登录了，并且是特定的方法，则检查权限
        if (ctx.user && methodName === 'findAllUsers') {
            return await this.casbinEnforcerService.enforce(
                ctx.user,
                'USER_ROLES',
                'read'
            );
        }
        // 未登录用户不允许访问
        return false;
    }
}
