import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class addMessageParam {
    @Rule(RuleType.string().required().min(2).max(10))
    @ApiProperty({ description: '评论人的名称', example: 'admin' })
    name: string;

    @Rule(RuleType.number().required().max(1))
    @ApiProperty({ description: '是否游客', example: 1 })
    isVisitor: number;

    @Rule(RuleType.string().required())
    @ApiProperty({ description: '评论的内容', example: '评论内容测试😁😁😁😁' })
    content: string;

    @Rule(RuleType.string())
    @ApiProperty({
        description: '头像地址',
        example: 'http://q1.qlogo.cn/g?b=qq&nk=393340139&s=100',
    })
    avatar?: string;
}
