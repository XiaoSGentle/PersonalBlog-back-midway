// src/decorator/logging.decorator.ts
import { createCustomMethodDecorator } from '@midwayjs/core';

// 装饰器内部的唯一 id
export const AUTH_KEY = 'decorator:auth_11adwo131232sd21';

export function NoAuth(): MethodDecorator {
    // 我们传递了一个可以修改展示格式的参数
    return createCustomMethodDecorator(AUTH_KEY, null);
}
