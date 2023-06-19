import { CasbinRule } from '@midwayjs/casbin-typeorm-adapter';
import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { SysUser } from '../entity/SysUser';
import { StringUtils } from '../util/Other/Utils';
import { CasbinEnforcerService } from '@midwayjs/casbin';
@Provide()
export class AuthorityService {
    @InjectEntityModel(CasbinRule)
    authorityModel: Repository<CasbinRule>;
    @Inject()
    casbinEnforcerService: CasbinEnforcerService;

    async getRolesForDepart(departName: string) {
        return await this.authorityModel.find({
            where: { ptype: 'p', v0: departName },
        });
    }
    async addRoutersForDepart(departName: string, routerName: string) {
        const casbinRule = await this.createCasbinRule('p');
        casbinRule.v0 = departName;
        casbinRule.v1 = routerName;
        casbinRule.v2 = routerName.split('::')[1];
        return !StringUtils.isEmpty(await this.authorityModel.save(casbinRule));
    }
    async getAllRouters() {
        return await this.authorityModel.find({
            where: { ptype: 'p', v0: 'admin' },
        });
    }
    async addRolesForUser(userUuid: string, roleName: string) {
        const casbinRule = await this.createCasbinRule('g');
        casbinRule.v0 = userUuid;
        casbinRule.v1 = roleName;
        this.authorityModel.save(casbinRule);
    }
    async getUsersByDepart(departName: string) {
        return await this.authorityModel.find({
            where: {
                ptype: 'g',
                v1: departName,
            },
        });
    }
    async getAuthorityByUuid(uuid: string) {
        const reInsql = await this.authorityModel.find({
            select: { v1: true },
            where: {
                v0: uuid,
            },
        });
        const result: string[] = [];
        reInsql.forEach(res => {
            result.push(res.v1);
        });
        return result;
    }
    async addUsersForDepart(departName: string, users: SysUser[]) {
        try {
            users.forEach(async user => {
                const casbinRule = await this.createCasbinRule('g');
                casbinRule.v0 = user.uuid;
                casbinRule.v1 = departName;
                casbinRule.v2 = user.nickname;
                await this.authorityModel.save(casbinRule);
            });
        } catch (error) {
            return false;
        }
        return true;
    }
    private async createCasbinRule(ptype: string): Promise<CasbinRule> {
        const casbinRule = new CasbinRule();
        casbinRule.ptype = ptype;
        return casbinRule;
    }
}
