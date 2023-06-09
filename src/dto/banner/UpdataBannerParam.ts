import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class UpdataBannerParam {
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: 'uuid唯一主键',
        example: '1',
    })
    uuid: string;
    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '标题',
        example: '穷游平江路',
    })
    title: string;

    @Rule(RuleType.number().required())
    @ApiProperty({
        description: '高度',
        example: 370,
    })
    height: number;

    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '图标',
        example: 'Notebook',
    })
    icon: string;

    @Rule(RuleType.string().uri())
    @ApiProperty({
        description: '图片的链接',
        example: 'https://xiaos-1314769426.cos.ap-nanjing.myqcloud.com/3.jpg',
    })
    backImg: string;

    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '分类',
        example: 'banner_home,banner_note,banner_pic,banner_message',
    })
    classify: string;

    @Rule(RuleType.string().required())
    @ApiProperty({
        description: '内容',
        example:
            '这里承载了我的所有回忆,记录着我的点点滴滴.\n珍惜当下、热爱、感悟...',
    })
    content: string;
}
