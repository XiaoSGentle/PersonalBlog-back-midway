import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class Pageparam {
    @Rule(RuleType.number().required())
    @ApiProperty({ description: '页码', type: 'number', example: 1 })
    pageNum?: number;
    @Rule(RuleType.number().required())
    @ApiProperty({ description: '页码', type: 'number', example: 1 })
    pageSize?: number;
}
