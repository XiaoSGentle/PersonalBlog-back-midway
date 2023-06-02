import { Catch } from '@midwayjs/core';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';
import { Context } from '@midwayjs/koa';
import { ApiCode, ApiMsg } from '../util/ApiResult/ApiCode';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

@Catch(UnauthorizedError)
export class UnauthorizedFilter {
    async catch(err: Error, ctx: Context) {
        return ApiResult.fail(ApiCode.UNAUTHORIZED, ApiMsg.UNAUTHORIZED);
    }
}

@Catch(TokenExpiredError)
export class TokenExpiredFilter {
    async catch(err: Error, ctx: Context) {
        return ApiResult.fail(ApiCode.TOKEN_EXPIRED, ApiMsg.TOKEN_EXPIRED);
    }
}
@Catch(JsonWebTokenError)
export class JsonWebTokenFilter {
    async catch(err: Error, ctx: Context) {
        return ApiResult.fail(ApiCode.TOKEN_INVALID, ApiMsg.TOKEN_INVALID);
    }
}
