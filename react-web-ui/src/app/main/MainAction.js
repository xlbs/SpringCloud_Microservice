import {Ajax,AjaxPromise} from "../../commutils/utils/Ajax";
import {push} from "react-router-redux";
import cookies from "react-cookies";
import {CurrentUser} from "../../commutils/utils/CurrentUser";
import {hiddenLoginBox, setErrorMsg, setPassword, setUserName, showLoginBox} from "../../commutils/actions/Login";

function testTimeOut() {
    const url = $requestContext.path + "/home";
    return (dispatch) => {
        Ajax.post({
            url: url,
            params: {}
        }, (res) =>{
            console.log(res);
        }, dispatch)
    }
}


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
            dispatch(hiddenLoginBox());
        }else{
            dispatch(setErrorMsg(res.message));
        }
    }).catch( ex => {
        console.log(ex);
    })
}


export const actions = {
    testTimeOut,
    login,
    setUserName,
    setPassword,
    setErrorMsg,
    showLoginBox,
    hiddenLoginBox
}

