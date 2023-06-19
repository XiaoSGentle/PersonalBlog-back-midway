import { Catch } from '@midwayjs/core';
import {
    ForbiddenError,
    UnauthorizedError,
} from '@midwayjs/core/dist/error/http';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ApiCode, ApiMsg } from '../util/ApiResult/ApiCode';
import { ApiResult } from '../util/ApiResult/ApiResult';

@Catch(UnauthorizedError)
export class UnauthorizedFilter {
    async catch() {
        return ApiResult.fail(ApiCode.UNAUTHORIZED, ApiMsg.UNAUTHORIZED);
    }
}

@Catch(TokenExpiredError)
export class TokenExpiredFilter {
    async catch() {
        return ApiResult.fail(ApiCode.TOKEN_EXPIRED, ApiMsg.TOKEN_EXPIRED);
    }
}
@Catch(JsonWebTokenError)
export class JsonWebTokenFilter {
    async catch() {
        return ApiResult.fail(ApiCode.TOKEN_INVALID, ApiMsg.TOKEN_INVALID);
    }
}
@Catch(ForbiddenError)
export class ForbiddenFilter {
    async catch() {
        return ApiResult.fail(ApiCode.NO_AUTHYORITY, ApiMsg.NO_AUTHYORITY);
    }
}
