import { createCustomMethodDecorator } from '@midwayjs/core';

export const REFRESHCASBIN_KEY = 'decorator:refreshcasbin_key';

/**
 * 刷新casbin权限
 * @returns ？？？
 */
export function RefreshCasBin(): MethodDecorator {
    return createCustomMethodDecorator(REFRESHCASBIN_KEY, {});
}
