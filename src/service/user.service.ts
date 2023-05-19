import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { CerateUserParam } from '../dto/user/CreateUserParam';
import { LoginParam } from '../dto/user/LoginParam';
import { SysUser } from '../entity/SysUser';
@Provide()
export class UserService {
    @InjectEntityModel(SysUser)
    userModel: Repository<SysUser>;
    /**
     * 用户登录
     * @param loginParam 登录参数
     * @returns token
     */
    async Login(loginParam: LoginParam) {
        const username = loginParam.username;
        const result = await this.userModel.find({
            where: { username: username },
        });
        return result;
    }
    async createUser(createUserparam: CerateUserParam) {
        // const user: SysUser = { ...createUserparam };
        return createUserparam;
    }
}
