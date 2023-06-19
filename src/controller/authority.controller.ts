import { CasbinEnforcerService } from '@midwayjs/casbin';
import { CasbinRule } from '@midwayjs/casbin-typeorm-adapter';
import {
    Body,
    Controller,
    Del,
    Get,
    Inject,
    MidwayWebRouterService,
    Post,
    Put,
    Query,
    RouterInfo,
} from '@midwayjs/core';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiTags,
} from '@midwayjs/swagger';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Context } from 'koa';
import { Repository } from 'typeorm';
import { AddRouterForDepartParam } from '../dto/authority/AddRouterForDepartParam';
import { AddUserForDepartParam } from '../dto/authority/AddUserForDepartParam';
import { SysDepart } from '../entity/SysDepart';
import { AuthorityService } from '../service/authority.service';
import { BannerService } from '../service/banner.service';
import { FileService } from '../service/file.service';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { AddDepartParam } from '../dto/authority/AddDepartParam';
import { RefreshCasBin } from '../decorator';

@ApiBearerAuth()
@ApiTags('管理员:权限管理')
@Controller('/admin/authority')
export class AuthorityController {
    @Inject() ctx: Context;
    @Inject() midwayWebRouterService: MidwayWebRouterService;
    @Inject() casbinEnforcerService: CasbinEnforcerService;
    @InjectEntityModel(CasbinRule) casbinService: Repository<CasbinRule>;
    @InjectEntityModel(SysDepart) departService: Repository<SysDepart>;
    @Inject() fileService: FileService;
    @Inject() bannerService: BannerService;
    @Inject() authorityService: AuthorityService;

    @ApiOperation({ summary: '重置路由权限' })
    @Put('/', { description: '管理员:权限:重置路由权限' })
    @RefreshCasBin()
    async resetAuthority() {
        return ApiResult.upStatus(await this.resetAuthor());
    }

    @ApiOperation({ summary: '获取所有路由' })
    @Get('/router', { description: '管理员:权限:获取所有路由' })
    async getAllRouters() {
        return ApiResult.ok(await this.authorityService.getAllRouters());
    }
    @ApiOperation({ summary: '获取所有部门' })
    @Get('/depart', { description: '管理员:权限:获取所有部门' })
    async getAllDepart() {
        return ApiResult.ok(await this.departService.find());
    }
    @ApiOperation({ summary: '添加部门' })
    @Post('/depart', { description: '管理员:权限:添加部门' })
    @ApiBody({ type: AddDepartParam })
    async addAllDepart(@Body() addDepartParam: AddDepartParam) {
        return ApiResult.ok(await this.departService.save(addDepartParam));
    }

    @ApiOperation({ summary: '获取某个部门拥有的路由权限' })
    @Get('/depart/router', {
        description: '管理员:权限:获取某个部门拥有的路由权限',
    })
    async getRoutersByDepart(@Query('depart') depart: string) {
        return ApiResult.ok(
            await this.authorityService.getRolesForDepart(depart)
        );
    }
    @ApiOperation({ summary: '获取某个部门拥有的人员' })
    @Get('/depart/user', { description: '管理员:权限:获取某个部门拥有的人员' })
    async getUserByDepart(@Query('depart') depart: string) {
        return ApiResult.ok(
            await this.authorityService.getUsersByDepart(depart)
        );
    }

    @ApiOperation({ summary: '为某个部门添加人员' })
    @Put('/depart/users', { description: '管理员:权限:为某个部门添加人员' })
    @RefreshCasBin()
    @ApiBody({ type: AddUserForDepartParam })
    async addUserForDepart(
        @Body() addUserForDepartParam: AddUserForDepartParam
    ) {
        return ApiResult.addStatus(
            await this.authorityService.addUsersForDepart(
                addUserForDepartParam.departName,
                addUserForDepartParam.users
            )
        );
    }

    @ApiOperation({ summary: '为部门添加路由权限' })
    @Put('/depart/routers', { description: '管理员:权限:为部门添加路由权限' })
    @RefreshCasBin()
    @ApiBody({ type: AddRouterForDepartParam })
    async addRouterForDepart(
        @Body() addRouterForDepartParam: AddRouterForDepartParam
    ) {
        return ApiResult.addStatus(
            await this.authorityService.addRoutersForDepart(
                addRouterForDepartParam.departName,
                addRouterForDepartParam.routerName
            )
        );
    }
    @ApiOperation({ summary: '删除一条规则' })
    @Del('/depart', { description: '管理员:权限:删除一条规则' })
    @RefreshCasBin()
    async delCasbinRule(@Query('uuid') uuid: string) {
        return ApiResult.delStatus(
            (await this.casbinService.delete(uuid)).affected > 0 ? true : false
        );
    }
    // 重置路由
    private async resetAuthor(): Promise<boolean> {
        try {
            const routers: RouterInfo[] =
                await this.midwayWebRouterService.getFlattenRouterTable();
            routers.sort((a, b) => {
                return (
                    a.fullUrlFlattenString.length -
                    b.fullUrlFlattenString.length
                );
            });

            routers.forEach((router, index) => {
                const casbinRule = new CasbinRule();
                casbinRule.id = index + 1;
                casbinRule.ptype = 'p';
                casbinRule.v0 = 'admin';
                casbinRule.v1 =
                    router.fullUrl +
                    '::' +
                    router.requestMethod.toString().toUpperCase();
                casbinRule.v2 = router.requestMethod.toString().toUpperCase();
                casbinRule.v3 = router.description;
                this.casbinService.save(casbinRule);
            });
            const casbinRule = new CasbinRule();
            casbinRule.id = (await this.casbinService.count()) + 1;
            casbinRule.ptype = 'g';
            casbinRule.v0 = '1';
            casbinRule.v1 = 'admin';
            casbinRule.v2 = '系统管理员';
            this.casbinService.save(casbinRule);
        } catch (error) {
            return false;
        }
        return true;
    }
}
