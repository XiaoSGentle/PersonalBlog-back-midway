import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class AddNoteParam {
    @Rule(RuleType.string().required().min(13).max(15))
    @ApiProperty({
        description: '分类项的uuid',
        example: '16843920727190',
    })
    classificationUuid: string;

    @Rule(RuleType.string().required().min(2).max(50))
    @ApiProperty({ description: '文章标题', example: '16843920727190' })
    title: string;

    @Rule(RuleType.array())
    @ApiProperty({ description: '文章标签', example: ['linux', '服务器'] })
    tags: Array<string>;

    @Rule(RuleType.string().uri())
    @ApiProperty({
        description: '预览图',
        example:
            'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/16849910888523.jpg',
    })
    banner: string;
}
