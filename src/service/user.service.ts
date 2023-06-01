import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CerateUserParam } from '../dto/user/CreateUserParam';
import { LoginParam } from '../dto/user/LoginParam';
import { SysUser } from '../entity/SysUser';
@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class UserService {
    @InjectEntityModel(SysUser)
    userModel: Repository<SysUser>;

    @Inject()
    jwtService: JwtService;
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
        return result;
    }
    async createUser(createUserparam: CerateUserParam) {
        return createUserparam;
    }
}
