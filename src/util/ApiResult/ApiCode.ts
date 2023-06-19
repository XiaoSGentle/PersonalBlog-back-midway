// 定义错误代码返回
export enum ApiMsg {
    LOGIN_SUCCESS = '登陆成功',
    LOGIN_FAIL = '登陆失败，请检查用户名或者密码',
    UNAUTHORIZED = '身份认证失败,请重新登录',
    NO_LOGIN = '未登录',
    NO_AUTHYORITY = '没有权限',
    NOT_FOND_PATH = '未找到该请求',
    TOKEN_EXPIRED = '登录状态过期',
    TOKEN_INVALID = 'TOKEN错误',
    DELETE_FAIL = '删除失败',
    DELETE_SUCCESS = '删除成功',
    UPDATE_FAIL = '更新失败',
    UPDATE_SUCCESS = '更新成功',
    ADD_SUCCESS = '新增成功',
    ADD_FAIL = '新增失败',
    CHANGE_SUCCESS = '修改成功',
    CHANGE_FAIL = '修改成功',
}
export enum ApiCode {
    SUCCESS = 200,
    TIP_SUCCESS = 299,
    FAILE = 400,
    UNAUTHORIZED = 401,
    NO_AUTHYORITY = '403',
    NOT_FOND_PATH = 404,
    VALIDATION_ERROR = 422,
    TOKEN_EXPIRED = 419,
    TOKEN_INVALID = 498,
}
