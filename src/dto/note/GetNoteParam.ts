import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { Pageparam } from '../../util/Page/PageParam';

export class GetNoteParam extends Pageparam {
    @Rule(RuleType.string().empty(''))
    @ApiProperty({ description: '关键字搜索', example: 'java' })
    keyword: string;

    @Rule(RuleType.string().empty(''))
    @ApiProperty({
        description: '分类uuid',
        example: '16843920727193',
    })
    classfiyUuids: string;

    @Rule(RuleType.string().empty(''))
    @ApiProperty({ description: '收藏者的uuid', example: '10203281021' })
    collectorUuid: string;

    @Rule(RuleType.string().empty(''))
    @ApiProperty({ description: '创建者uuid', example: '10203281021' })
    createUUid: string;

    @Rule(RuleType.string().empty(''))
    @ApiProperty({ description: '创建时间', example: '' })
    createTime: string;
}
