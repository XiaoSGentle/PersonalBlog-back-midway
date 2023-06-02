// 定义错误代码返回
export enum ApiMsg {
    LOGIN_SUCCESS = '登陆成功',
    UNAUTHORIZED = '身份认证失败,请重新登录',
    NO_LOGIN = '未登录',
    NOT_FOND_PATH = '未找到该请求',
    TOKEN_EXPIRED = '登录状态过期',
    TOKEN_INVALID = 'TOKEN错误',
}
export enum ApiCode {
    SUCCESS = 200,

    FAILE = 400,
    UNAUTHORIZED = 401,
    NOT_FOND_PATH = 404,
    VALIDATION_ERROR = 422,
    TOKEN_EXPIRED = 419,
    TOKEN_INVALID = 498,
}
