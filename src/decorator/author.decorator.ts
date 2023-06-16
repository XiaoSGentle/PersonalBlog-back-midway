import { createCustomMethodDecorator } from '@midwayjs/core';

export const AUTHOR_KEY = 'decorator:statistics_key';

/**
 * 创建添加统计次数的注解
 * @param key 需要添加的类型枚举
 * @returns ？？？
 */
export function Author(key: string[]): MethodDecorator {
    return createCustomMethodDecorator(AUTHOR_KEY, { key });
}
