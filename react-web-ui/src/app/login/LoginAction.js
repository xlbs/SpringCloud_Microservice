import {push} from 'react-router-redux';
import cookies from "react-cookies";
import {CurrentUser} from "../../commutils/utils/CurrentUser";
import {AjaxPromise} from "../../commutils/utils/Ajax";
import {setErrorMsg, setPassword, setUserName} from "../../commutils/actions/Login";

/**
 * 登入操作
 * @param user
 * @returns {function(*): Promise<any>}
 */
function login(user) {
    const url = $requestContext.path + "/loginB";
    const config = {};
    config.method = 'POST';
    config.params = {
        userNo: user.userName,
        password: user.password
    }
    return (dispatch) => AjaxPromise(url,config).then(res => {
        if (res.status=='success') {
            sessionStorage.setItem("isLogin","1");//已登入
            cookies.save("userId",res.data.userId);
            cookies.save("userNo",res.data.userNo);
            CurrentUser.set(res);
            dispatch(push("/home"));//跳转到首页
        }else{
            dispatch(setErrorMsg(res.message));
        }
    }).catch( ex => {
        console.log(ex);
    })
}




export const actions = {
    login,
    setUserName,
    setPassword,
    setErrorMsg
}