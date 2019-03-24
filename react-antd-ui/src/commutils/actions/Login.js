import {CurrentSessionCache} from "../utils/CurrentCache";

export const LOGIN_FAIL = "LOGIN_FAIL";
export const TIME_OUT = "TIME_OUT";

/**
 * 设置登入失败的错误信息
 * @param msg
 */
export function setErrorMsg(msg){
    return  {
        type: LOGIN_FAIL,
        errorMsg: msg
    }
}

/***
 * session超时：显示登入框
 * @returns {{type: string, isTimeOut: boolean}}
 */
export function showLoginBox(){
    return  {
        type: TIME_OUT,
        isTimeOut: true,
        errorMsg: '会话已超时，请重新登入',
        username: CurrentSessionCache.get("USER").username,
        userNameDisabled: true
    }
}

/**
 * 重新登入：隐藏登入框
 * @returns {{type: string, isTimeOut: boolean}}
 */
export function hiddenLoginBox(){
    return  {
        type: TIME_OUT,
        isTimeOut: false,
        errorMsg: '',
        username: '',
        userNameDisabled: false
    }
}