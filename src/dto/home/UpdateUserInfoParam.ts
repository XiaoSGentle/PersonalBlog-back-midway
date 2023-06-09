import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class UpdateUserInfoParam {
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '网站拥有者名称',
        example: '宋超阳',
    })
    name: string;

    @Rule(RuleType.string().required())
    @ApiProperty({ description: '座右铭内容', example: '人生如戏,全靠演技' })
    content: string;

    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '头像',
        example:
            'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/16861250659366.jpg',
    })
    avatar: string;
}
