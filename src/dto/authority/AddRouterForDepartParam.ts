import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class AddRouterForDepartParam {
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '部门名称',
    })
    departName: string;

    @Rule(RuleType.string().required())
    @ApiProperty({ description: '路由名称' })
    routerName: string;
}
