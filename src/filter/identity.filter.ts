import { Catch } from '@midwayjs/core';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';
import { Context } from '@midwayjs/koa';
import { ApiCode, ApiMsg } from '../util/ApiResult/ApiCode';
import { ApiResult } from '../util/ApiResult/ApiResult';

@Catch(UnauthorizedError)
export class UnauthorizedFilter {
    async catch(err: Error, ctx: Context) {
        ctx.response.body = ApiResult.fail(
            ApiCode.UNAUTHORIZED,
            ApiMsg.UNAUTHORIZED
        );
    }
}
