// 定义错误代码返回
export enum ApiMsg {
    LOGIN_SUCCESS = '登陆成功',
    UNAUTHORIZED = '身份认证失败',
    NO_LOGIN = '未登录',
}
export enum ApiCode {
    SUCCESS = 200,
    FAILE = 400,
    UNAUTHORIZED = 401,
    VALIDATION_ERROR = 422,
}
