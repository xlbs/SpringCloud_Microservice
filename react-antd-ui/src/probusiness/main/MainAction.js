import {push} from "react-router-redux";
import {AjaxPromise} from "../../commutils/utils/Ajax";
import {CurrentUser} from "../../commutils/utils/CurrentUser";
import {setErrorMsg, hiddenLoginBox} from "../../commutils/actions/Login";
import {showConfirm} from "../../commutils/components/dialog/MessageDialog";

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
        username: user.username,
        password: user.password
    }
    return (dispatch) => AjaxPromise(url,config).then(res => {
        if (res.status=='success') {
            sessionStorage.setItem("isLogin","1");//已登入
            CurrentUser.set(res);
            dispatch(hiddenLoginBox());
        }else{
            dispatch(setErrorMsg(res.message));
        }
    }).catch( ex => {
        console.log(ex);
    })
}

/**
 * 退出登入
 * @returns {Function}
 */
function exitLogin() {
    return (dispatch) => {
        showConfirm("是否确定退出？",
            ()=>{//确定
                dispatch(push("/login"));//跳转到登入页
            },
            ()=>{//取消

            }
        )
    }
}




export const actions = {
    login,
    exitLogin,
    setErrorMsg,
    hiddenLoginBox
}