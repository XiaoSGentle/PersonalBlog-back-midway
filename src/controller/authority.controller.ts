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
import { Like, Repository } from 'typeorm';
import { AddRouterForDepartParam } from '../dto/authority/AddRouterForDepartParam';
import { AddUserForDepartParam } from '../dto/authority/AddUserForDepartParam';
import { SysDepart } from '../entity/SysDepart';
import { BannerService } from '../service/banner.service';
import { FileService } from '../service/file.service';
import { ApiCode } from '../util/ApiResult/ApiCode';
import { ApiResult } from '../util/ApiResult/ApiResult';
import { StringUtils } from '../util/Other/Utils';

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

    @ApiOperation({ summary: '重置路由权限' })
    @Put('/', { description: '重置路由权限' })
    async resetAuthority() {
        await this.resetAuthor();
        return ApiResult.ok(
            ApiCode.TIP_SUCCESS,
            '重置成功，请登录管理员账号重新设置路由'
        );
    }

    @ApiOperation({ summary: '获取所有路由' })
    @Get('/router', { description: '获取所有路由' })
    async getAllRouters() {
        return ApiResult.ok(
            await this.casbinService.find({
                where: { ptype: 'p', v0: Like('/%') },
            })
        );
    }
    @ApiOperation({ summary: '获取所有部门' })
    @Get('/depart', { description: '获取所有部门' })
    async getAllDepart() {
        return ApiResult.ok(await this.departService.find());
    }
    @ApiOperation({ summary: '添加部门' })
    @Post('/depart', { description: '添加部门' })
    @ApiBody({ type: SysDepart })
    async addDepart(@Body() depart: SysDepart) {
        return ApiResult.ok(await this.departService.save(depart));
    }

    @ApiOperation({ summary: '获取某个部门拥有的路由权限' })
    @Get('/depart/router', { description: '获取某个部门拥有的路由权限' })
    async getRoutersByDepart(@Query('depart') depart: string) {
        return ApiResult.ok(
            await this.casbinService.find({
                where: { v1: depart + '_url', ptype: 'g2' },
            })
        );
    }
    @ApiOperation({ summary: '获取某个部门拥有的人员' })
    @Get('/depart/user', { description: '获取某个部门拥有的人员' })
    async getUserByDepart(@Query('depart') depart: string) {
        return ApiResult.ok(
            await this.casbinService.find({
                where: {
                    v1: depart,
                    ptype: 'g',
                },
            })
        );
    }

    @ApiOperation({ summary: '为某个部门添加人员' })
    @Put('/depart/users', { description: '为某个部门添加人员' })
    @ApiBody({ type: Array<AddUserForDepartParam> })
    async addUserForDepart(
        @Body() addUserForDepartParam: Array<AddUserForDepartParam>
    ) {
        return ApiResult.addStatus(
            !StringUtils.isEmpty(
                await this.casbinService.save(addUserForDepartParam)
            )
        );
    }

    @ApiOperation({ summary: '为部门添加路由权限' })
    @Put('/depart/routers', { description: '为部门添加路由权限' })
    @ApiBody({ type: Array<AddRouterForDepartParam> })
    async addRouterForDepart(
        @Body() addRouterForDepartParam: Array<AddRouterForDepartParam>
    ) {
        await this.casbinService.delete({
            v1: addRouterForDepartParam[0].v1,
        });
        return ApiResult.changeStatus(
            //TODO: 这个地方怎么去判断
            (await this.casbinService.save(addRouterForDepartParam))
                ? true
                : false
        );
    }
    @ApiOperation({ summary: '删除一条规则' })
    @Del('/depart', { description: '删除一条规则⚡⚡⚡比较危险' })
    async delCasbinRule(@Query('uuid') uuid: string) {
        return ApiResult.delStatus(
            (await this.casbinService.delete(uuid)).affected > 0
        );
    }
    // 重置路由
    private async resetAuthor() {
        const routers: RouterInfo[] =
            await this.midwayWebRouterService.getFlattenRouterTable();
        routers.sort((a, b) => {
            return (
                a.fullUrlFlattenString.length - b.fullUrlFlattenString.length
            );
        });
        // 循环插入所有路由
        routers.forEach(async router => {
            const casbinRule = new CasbinRule();
            // 以路由和请求方法作为id
            casbinRule.id = router.fullUrl + '::' + router.requestMethod;
            casbinRule.ptype = 'p';
            casbinRule.v0 = router.fullUrl + '::' + router.requestMethod;
            casbinRule.v1 = router.requestMethod;
            casbinRule.v2 = router.description;
            await this.casbinService.save(casbinRule);
            // 为管理员组别添加所有的权限
            casbinRule.id =
                router.fullUrl + '::' + router.requestMethod + '::admin';
            casbinRule.ptype = 'g2';
            casbinRule.v1 = 'admin_url';
            casbinRule.v2 = '';
            await this.casbinService.save(casbinRule);
        });
        // 将用户id为1的管理员添加到管理部
        const casbinRule = new CasbinRule();
        casbinRule.id = 'admin::1';
        casbinRule.ptype = 'g';
        casbinRule.v0 = '1';
        casbinRule.v1 = 'admin';
        casbinRule.v2 = '系统管理员';
        await this.casbinService.save(casbinRule);
        // 将权限组和部门权限绑定
        const departs: SysDepart[] = await this.departService.find();
        departs.forEach(async depart => {
            const casbinPartUrl = new CasbinRule();
            casbinPartUrl.id = depart.role + '_url_part';
            casbinPartUrl.ptype = 'p';
            casbinPartUrl.v0 = depart.role;
            casbinPartUrl.v1 = depart.role + '_url';
            casbinPartUrl.v2 = 'true';
            await this.casbinService.save(casbinPartUrl);
        });
    }
}
