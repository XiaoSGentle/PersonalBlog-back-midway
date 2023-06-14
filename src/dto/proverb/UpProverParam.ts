import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class UpProverParam {
    @Rule(RuleType.string().empty(''))
    @ApiProperty({
        description: 'uuid',
        example: '16843920727190',
    })
    uuid: string;

    @Rule(RuleType.string().required())
    @ApiProperty({ description: '名言内容', example: '我是鸟' })
    content: string;

    @Rule(RuleType.string())
    @ApiProperty({ description: '名言作者', example: '佚名' })
    author: string;

    @Rule(RuleType.string())
    @ApiProperty({ description: '名言解释', example: '可以飞的鸟' })
    des: string;

    @Rule(RuleType.string().required())
    @ApiProperty({ description: '名言分类', example: 'saying' })
    pos: string;
}
