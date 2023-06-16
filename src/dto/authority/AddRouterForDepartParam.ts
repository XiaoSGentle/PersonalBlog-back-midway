import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class AddRouterForDepartParam {
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '路由名称::方法::部门',
        example: '/api/admin/pic::post::admin',
    })
    id: string;

    @Rule(RuleType.string().required())
    @ApiProperty({ description: '类型:本接口固定g2', example: 'g2' })
    ptype: string;

    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '路由::方法',
        example: '/api/Login::post',
    })
    v0: string;
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '部门_url',
        example: 'admin_url',
    })
    v1: string;
    @Rule(RuleType.string())
    @ApiProperty({
        description: 'v',
        example: 'v',
    })
    v2: string;
    @Rule(RuleType.string())
    @ApiProperty({
        description: 'v',
        example: 'v',
    })
    v3: string;
    @Rule(RuleType.string())
    @ApiProperty({
        description: 'v',
        example: 'v',
    })
    v4: string;
    @Rule(RuleType.string())
    @ApiProperty({
        description: 'v',
        example: 'v',
    })
    v5: string;
    @Rule(RuleType.string())
    @ApiProperty({
        description: 'v',
        example: 'v',
    })
    v6: string;
}
