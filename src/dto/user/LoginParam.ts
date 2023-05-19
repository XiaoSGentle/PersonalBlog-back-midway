import { ApiProperty } from '@midwayjs/swagger';

export class LoginParam {
    @ApiProperty({ description: '用户名', example: 'admin' })
    username: string;
    @ApiProperty({ description: '密码', example: 'admin' })
    password: string;
}
