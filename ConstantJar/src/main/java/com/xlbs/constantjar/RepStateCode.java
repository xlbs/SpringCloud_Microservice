package com.xlbs.constantjar;

public enum RepStateCode {

    SUCCESS(1, true, "成功"),/* 成功状态码 */
    FAILURE(0, false, "程序异常,请联系开发人员"), /* 失败状态码 */
    SESSION_TIME_OUT(10000, false, "SESSION超时，请求被禁用"),/* SESSION超时，请求被禁用 */
    SERVICE_TIME_OUT(20000, false,  "请求超时，请检查您的网络或稍后重试"),/* 服务请求超时*/

    /* 参数错误：10001-19999 */
    PARAM_IS_INVALID(10001, false,  "参数无效"),
    PARAM_IS_BLANK(10002, false, "参数为空"),
    PARAM_TYPE_BIND_ERROR(10003, false, "参数类型错误"),
    PARAM_NOT_COMPLETE(10004, false, "参数缺失"),

    /* 用户错误：20001-29999*/
    USER_NOT_EXIST(20001, false, "用户不存在"),
    USER_LOGIN_ERROR(20002, false, "账号或密码错误"),
    USER_ACCOUNT_FORBIDDEN(20003, false, "账号已被禁用"),
    USER_HAS_EXISTED(20004, false, "用户已存在"),
    USER_NOT_EXISTED(20005, false, "用户未登录"),

    /* 业务错误：30001-39999 */
    ROLE_DELETE(30001, false, "此角色已关联用户，不能删除"),
    MENU_DELETE(30002, false, "此菜单已关联角色，不能删除"),

    /* 数据错误：50001-599999 */
    RESULE_DATA_NONE(50001, false, "数据未找到"),
    DATA_IS_WRONG(50002, false, "数据有误"),
    DATA_ALREADY_EXISTED(50003, false, "数据已存在"),

    /* 接口错误：60001-69999 */
    INTERFACE_INNER_INVOKE_ERROR(60001, false, "内部系统接口调用异常"),
    INTERFACE_OUTTER_INVOKE_ERROR(60002, false, "外部系统接口调用异常"),
    INTERFACE_FORBID_VISIT(60003, false, "该接口禁止访问"),
    INTERFACE_ADDRESS_INVALID(60004, false, "接口地址无效"),
    INTERFACE_REQUEST_TIMEOUT(60005, false, "接口请求超时"),
    INTERFACE_EXCEED_LOAD(60006, false, "接口负载过高"),

    /* 权限错误：70001-79999 */
    PERMISSION_NO_ACCESS(70001, false, "无访问权限");

    private Integer code;

    private Boolean state;

    private String msg;

    RepStateCode(Integer code, Boolean state, String msg) {
        this.code = code;
        this.state = state;
        this.msg = msg;
    }

    public Integer code() {
        return this.code;
    }

    public Boolean state(){
        return this.state;
    }

    public String msg() {
        return this.msg;
    }

    public static Integer getCode(String name) {
        for (RepStateCode item : RepStateCode.values()) {
            if (item.name().equals(name)) {
                return item.code;
            }
        }
        return null;
    }

    public static Boolean getState(String name) {
        for (RepStateCode item : RepStateCode.values()) {
            if (item.name().equals(name)) {
                return item.state;
            }
        }
        return null;
    }

    public static String getMsg(String name) {
        for (RepStateCode item : RepStateCode.values()) {
            if (item.name().equals(name)) {
                return item.msg;
            }
        }
        return null;
    }

    @Override
    public String toString() {
        return this.name();
    }


}
