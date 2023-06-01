import { MidwayError } from '@midwayjs/core';
import { ApiCode, ApiMsg } from '../util/ApiResult/ApiCode';

export class TokenExpiredError1 extends MidwayError {
    constructor() {
        super(ApiMsg.TOKEN_EXPIRED, ApiCode.TOKEN_EXPIRED.toString());
    }
}
