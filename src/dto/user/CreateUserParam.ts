import { ApiProperty } from '@midwayjs/swagger';

export class CerateUserParam {
    @ApiProperty({ description: '用户名', example: 'admin' })
    username: string;
    @ApiProperty({ description: '密码', example: 'admin' })
    password: string;
    @ApiProperty({ description: '昵称', example: 'Xiaos' })
    nickname: string;
    @ApiProperty({ description: '头像地址', example: '-' })
    avatar: string;
    @ApiProperty({
        description: '性别',
        example: 'admin',
        enum: ['male', 'fmale'],
    })
    sex: sex;
    @ApiProperty({ description: '星座', example: '巨蟹' })
    constellation: string;
    @ApiProperty({ description: '生日', example: '2001-10-12' })
    birthday: Date;
}

enum sex {
    male = 1,
    fmale = 0,
}
