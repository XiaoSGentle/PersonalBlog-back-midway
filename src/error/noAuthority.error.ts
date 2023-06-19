import { MidwayError } from '@midwayjs/core';
import { ApiCode, ApiMsg } from '../util/ApiResult/ApiCode';

export class NoAuthorityError extends MidwayError {
    constructor() {
        super(ApiMsg.NO_AUTHORITY, ApiCode.NO_AUTHORITY.toString());
    }
}
