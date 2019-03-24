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
    const params = {
        username: user.username,
        password: user.password
    }
    return (dispatch) =>{
        Ajax.post(
            {url,params},
            (res) =>{
                debugger;
                CurrentSessionCache.set("USER",res);
                if(res.userId || res.userId===0){
                    url = BASE_URL + "/menu/"+res.userId;
                    Ajax.get(
                        url,
                        (menu) =>{
                            CurrentSessionCache.set("MENU",menu);
                            sessionStorage.setItem("isLogin","1");//已登入
                            dispatch(push("/"));//跳转到首页
                        },
                        dispatch
                    );
                }
            },
            dispatch
        )
    }

}




export const actions = {
    login,
    setErrorMsg
}