import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CerateUserParam } from '../dto/user/CreateUserParam';
import { LoginParam } from '../dto/user/LoginParam';
import { SysUser } from '../entity/SysUser';
import { JwtUtil } from '../util/Jwt/Jwt';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { ApiCode, ApiMsg } from '../util/ApiResult/ApiCode';
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class UserService {
    @InjectEntityModel(SysUser)
    userModel: Repository<SysUser>;

    @Inject()
    jwtUtil: JwtUtil;
    /**
     * 用户登录
     * @param loginParam 登录参数
     * @returns token
     */
    async Login(loginParam: LoginParam) {
        const username = loginParam.username;
        const result = await this.userModel.findOne({
            where: { username: username },
        });
        if (result.password === loginParam.password) {
            result.password = '';
            return ApiResult.ok({
                userInfo: result,
                token: await this.jwtUtil.jwtSign({ uuid: result.uuid }),
            });
        }
        return ApiResult.fail(ApiCode.FAILE, ApiMsg.LOGIN_FAIL);
    }
    async createUser(createUserparam: CerateUserParam) {
        return createUserparam;
    }
}
