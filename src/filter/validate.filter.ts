import { Catch } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';
import { ApiCode } from '../util/ApiResult/ApiCode';
import { ApiResult } from '../util/ApiResult/ApiResult';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
    async catch(err: MidwayValidationError) {
        return ApiResult.fail(ApiCode.VALIDATION_ERROR, err.message);
    }
}
