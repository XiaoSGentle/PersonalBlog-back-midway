import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { ApiCode, ApiMsg } from '../util/ApiResult/ApiCode';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
    async catch(err: MidwayHttpError, ctx: Context) {
        return ApiResult.fail(ApiCode.NOT_FOND_PATH, ApiMsg.NOT_FOND_PATH);
    }
}
