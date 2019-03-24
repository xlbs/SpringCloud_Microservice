import {push} from 'react-router-redux';
import {CurrentSessionCache} from "../../commutils/utils/CurrentCache";
import {AjaxPromise,Ajax} from "../../commutils/utils/Ajax";
import {setErrorMsg} from "../../commutils/actions/Login";

const BASE_URL = $requestContext.path;

/**
 * 登入操作
 * @param user
 * @returns {function(*): Promise<any>}
 */
function login(user) {
    let url = BASE_URL+ "/loginB";
    const config = {};
    config.method = 'POST';
    config.params = {
        username: user.username,
        password: user.password
    }
    return (dispatch) => AjaxPromise(url,config).then(res => {
        if (res.status=='success') {
            CurrentSessionCache.set("USER",res.user);
            url = BASE_URL + "/menu/"+res.user.userId;
            Ajax.get(
                url,
                (menu) =>{
                    CurrentSessionCache.set("MENU",menu.data);
                    sessionStorage.setItem("isLogin","1");//已登入
                    dispatch(push("/"));//跳转到首页
                },
                dispatch
            );
        }else{
            dispatch(setErrorMsg(res.message));
        }
    }).catch( ex => {
        console.log(ex);
    })
}




export const actions = {
    login,
    setErrorMsg
}