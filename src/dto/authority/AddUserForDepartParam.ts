import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class AddUserForDepartParam {
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '部门::用户uuid',
        example: 'admin::1',
    })
    id: string;

    @Rule(RuleType.string().required())
    @ApiProperty({ description: '类型:本接口固定g', example: 'g' })
    ptype: string;

    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '用户uuid',
        example: '1',
    })
    v0: string;
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '部门',
        example: 'admin',
    })
    v1: string;
}
