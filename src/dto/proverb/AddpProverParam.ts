import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class AddProverParam {
    @Rule(RuleType.string().required())
    @ApiProperty({ description: '名言内容', example: '16843920727190' })
    content: string;

    @Rule(RuleType.string())
    @ApiProperty({ description: '名言作者', example: '16843920727190' })
    author: string;

    @Rule(RuleType.string())
    @ApiProperty({ description: '名言解释', example: '16843920727190' })
    des: string;

    @Rule(RuleType.string().required())
    @ApiProperty({ description: '名言分类', example: '16843920727190' })
    pos: string;
}
