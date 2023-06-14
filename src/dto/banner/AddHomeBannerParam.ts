import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class AddHomeBannerParam {
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '图片地址',
        example: 'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/bg.jpg',
    })
    url: string;
}
