import {push} from 'react-router-redux';
import {CurrentCache} from "../../commutils/utils/CurrentCache";
import {AjaxPromise,Ajax} from "../../commutils/utils/Ajax";
import {setErrorMsg} from "../../commutils/actions/Login";

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
                dispatch(push("/"));//跳转到首页
            },dispatch);
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