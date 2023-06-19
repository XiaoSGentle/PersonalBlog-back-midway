import { Catch, httpError } from '@midwayjs/core';
import { ApiCode, ApiMsg } from '../util/ApiResult/ApiCode';
import { ApiResult } from '../util/ApiResult/ApiResult';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
    async catch() {
        return ApiResult.fail(ApiCode.NOT_FOND_PATH, ApiMsg.NOT_FOND_PATH);
    }
}
