export const USER_NAME = "USER_NAME";
export const PASSWORD = "PASSWORD";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const TIME_OUT = "TIME_OUT";
/**
 * 设置用户名
 * @param userName
 */
export function setUserName(userName){
    return  {
        type: USER_NAME,
        userName: userName
    }
}

/**
 * 设置密码
 * @param password
 */
export function setPassword(password){
    return  {
        type: PASSWORD,
        password: password
    }
}

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
        isTimeOut: true
    }
}

/**
 * 重新登入：隐藏登入框
 * @returns {{type: string, isTimeOut: boolean}}
 */
export function hiddenLoginBox(){
    return  {
        type: TIME_OUT,
        isTimeOut: false
    }
}