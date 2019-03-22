import {push} from "react-router-redux";
import {Ajax, AjaxPromise} from "../../commutils/utils/Ajax";
import {CurrentCache} from "../../commutils/utils/CurrentCache";
import {setErrorMsg, hiddenLoginBox} from "../../commutils/actions/Login";
import {showConfirm} from "../../commutils/components/dialog/MessageDialog";

/**
 * 登入操作
 * @param user
 * @returns {function(*): Promise<any>}
 */
function login(user) {
    let url = $requestContext.path + "/loginB";
    const config = {};
    config.method = 'POST';
    config.params = {
        username: user.username,
        password: user.password
    }
    return (dispatch) => AjaxPromise(url,config).then(res => {
        if (res.status=='success') {
            let cache = {};
            cache.user = res.user;
            CurrentCache.set(cache);
            url = $requestContext.path + "/user/menu/"+res.user.userId;
            Ajax.get(url,(menu) =>{
                cache.menu = menu.data;
                CurrentCache.set(cache);
                sessionStorage.setItem("isLogin","1");//已登入
                dispatch(hiddenLoginBox());
            },dispatch);
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