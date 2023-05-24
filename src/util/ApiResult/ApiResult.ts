import { ApiProperty } from '@midwayjs/swagger';
import { ApiCode } from './ApiCode';

/**
 * 统一返回
 */
export class ApiResult {
    static ok(data?: any, msg?: string): resultFormat {
        const result = new resultFormat();
        result.success = true;
        result.status = ApiCode.SUCCESS;
        if (check(msg)) {
            result.msg = msg;
        }
        if (check(data)) {
            result.data = data;
        }
        return result;
    }
    static fail(code?: any, msg?: any): resultFormat {
        const result = new resultFormat();
        result.success = false;
        result.status = code;
        result.msg = msg;
        return result;
    }
}

// 参数为空判断
function check(arg: any): boolean {
    if (arg !== null && arg !== '') {
        return true;
    }
    return false;
}

// 定义返回类
class resultFormat {
    @ApiProperty({ description: '状态码' })
    status: number;
    @ApiProperty({ description: '信息' })
    msg: string;
    @ApiProperty({ description: '数据主体' })
    data: any;
    @ApiProperty({ description: '成功状态' })
    success: boolean;
    // eslint-disable-next-line prettier/prettier
    constructor() { }
    /*
    // state
    public get State() {
        return this.state;
    }
    public set State(state: number) {
        this.state = state;
    }
    // 消息存取器
    public get Msg() {
        return this.msg;
    }
    public set Msg(msg: string) {
        this.msg = msg;
    }
    // 数据主体存取
    public get Data() {
        return this.data;
    }
    public set Data(data: any) {
        this.data = data;
    }
    // 成功状态存取
    public get Success() {
        return this.success;
    }
    public set Success(success: boolean) {
        this.success = success;
    }
    */
}
