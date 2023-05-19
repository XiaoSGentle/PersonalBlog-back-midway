import { ApiProperty } from '@midwayjs/swagger';

export class Pageparam {
    @ApiProperty({ description: '页码', type: 'number', example: 1 })
    pageNum?: number;
    @ApiProperty({ description: '页码', type: 'number', example: 1 })
    pageSize?: number;
}
