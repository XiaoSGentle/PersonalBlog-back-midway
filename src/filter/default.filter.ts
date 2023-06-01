import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiResult } from '../util/ApiResult/ApiResult';

@Catch()
export class DefaultErrorFilter {
    async catch(err: Error, ctx: Context) {
        // 所有的未分类错误会到这里
        return ApiResult.fail('错误未分类', err.message);
    }
}
