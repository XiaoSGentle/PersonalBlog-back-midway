import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class CreateNoteParam {
    @Rule(RuleType.string().required().min(20).max(20))
    @ApiProperty({
        description: 'uuid:若存在则更新,否则插入',
        example: '112321312321',
    })
    uuid: string;

    @Rule(RuleType.string().required().min(20).max(20))
    @ApiProperty({ description: '分类项的uuid', example: '112321312321' })
    classificationUuid: string;

    @Rule(RuleType.string().required().min(2).max(20))
    @ApiProperty({ description: '文章标题', example: 'java中的面向对象' })
    title: string;

    @Rule(RuleType.string().required().max(20).min(20))
    @ApiProperty({ description: '创建者uuid', example: '113129378912' })
    content: string;

    @Rule(RuleType.string().required().max(20).min(20))
    @ApiProperty({ description: '预览图', example: '113129378912' })
    banner: string;
}
