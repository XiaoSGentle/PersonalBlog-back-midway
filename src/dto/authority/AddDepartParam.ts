import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class AddDepartParam {
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '部门名称',
    })
    uuid: string;

    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '部门名称',
    })
    name: string;

    @Rule(RuleType.string().required())
    @ApiProperty({ description: '路由名称' })
    role: string;
}
