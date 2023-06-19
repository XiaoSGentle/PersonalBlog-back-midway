import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class AddUserForDepartParam {
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '部门名称',
    })
    departName: string;

    @Rule(RuleType.array().required())
    @ApiProperty({ description: '用户列表' })
    users: [];
}
