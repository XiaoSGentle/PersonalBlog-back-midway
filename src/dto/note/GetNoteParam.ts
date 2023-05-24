import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { Pageparam } from '../../util/Page/PageParam';

export class GetNoteParam extends Pageparam {
    @Rule(RuleType.string().min(6).max(16))
    @ApiProperty({ description: '关键字搜索', example: 'java' })
    keyword: string;

    @Rule(RuleType.string().min(2).max(9))
    @ApiProperty({ description: '收藏者的uuid', example: '113129378912' })
    collectorUuid: string;

    @Rule(RuleType.string().max(20).max(20))
    @ApiProperty({ description: '创建者uuid', example: '113129378912' })
    createUUid: string;

    @Rule(RuleType.string().min(3).max(3))
    @ApiProperty({ description: '创建时间', example: '3123123131' })
    createTime: string;
}
