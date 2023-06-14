import { createCustomMethodDecorator } from '@midwayjs/core';
import { StatisticsEnums } from '../enum/FunEnums';

export const STATISTICS_KEY = 'decorator:statistics_key';

/**
 * 创建添加统计次数的注解
 * @param key 需要添加的类型枚举
 * @returns ？？？
 */
export function AddStatisticsNum(key: StatisticsEnums): MethodDecorator {
    return createCustomMethodDecorator(STATISTICS_KEY, { key });
}
