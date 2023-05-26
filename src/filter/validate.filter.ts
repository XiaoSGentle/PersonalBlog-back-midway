import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { MidwayValidationError } from '@midwayjs/validate';
import { ApiCode } from '../util/ApiResult/ApiCode';
import { ApiResult } from '../util/ApiResult/ApiResult';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
    async catch(err: MidwayValidationError, ctx: Context) {
        ctx.body = ApiResult.fail(ApiCode.VALIDATION_ERROR, err.message);
    }
}
