import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class UpdatePhotoParam {
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: 'uuid唯一主键',
        example: '16843920727190',
    })
    uuid: string;
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '标题',
        example: '穷游平江路',
    })
    title: string;

    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '描述',
        example: '遇到了最爱的臭豆腐,好香啊!',
    })
    des: string;

    @Rule(RuleType.string().uri())
    @ApiProperty({
        description: '图片的链接',
        example: 'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/3.jpg',
    })
    url: string;

    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '分类',
        example: 'pic_gourmet,pic_view,pic_about_me',
    })
    classify: string;

    @Rule(RuleType.number().required())
    @ApiProperty({
        description: '是否展示',
        example: 1,
    })
    isShow: number;
}
