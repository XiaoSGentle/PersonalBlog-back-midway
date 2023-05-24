import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class CerateUserParam {
    @Rule(RuleType.string().required().min(5).max(16))
    @ApiProperty({ description: '用户名', example: 'admin' })
    username: string;

    @Rule(RuleType.string().required().min(6).max(16))
    @ApiProperty({ description: '密码', example: 'admin' })
    password: string;

    @Rule(RuleType.string().required().min(2).max(9))
    @ApiProperty({ description: '昵称', example: 'Xiaos' })
    nickname: string;

    @Rule(RuleType.string().required().uri())
    @ApiProperty({ description: '头像地址', example: '-' })
    avatar: string;

    @Rule(RuleType.number().required().min(1).max(1))
    @ApiProperty({
        description: '性别',
        example: 'admin',
        enum: ['male', 'fmale'],
    })
    sex: sex;

    @Rule(RuleType.string().required().min(3).max(3))
    @ApiProperty({ description: '星座', example: '巨蟹' })
    constellation: string;

    @Rule(RuleType.date())
    @ApiProperty({ description: '生日', example: '2001-10-12' })
    birthday: Date;
}

enum sex {
    male = 1,
    fmale = 0,
}
