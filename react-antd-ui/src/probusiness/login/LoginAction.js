import {push} from 'react-router-redux';
import {CurrentSessionCache} from "../../commutils/utils/CurrentCache";
import {Ajax} from "../../commutils/utils/Ajax";
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
                CurrentSessionCache.set("USER",res);
                if(res.userId || res.userId===0){
                    url = BASE_URL + "/menu/"+res.userId;
                    Ajax.get(
                        url,
                        (menu) =>{
                            CurrentSessionCache.set("MENU",menu);
                            let path;
                            if(menu[0].childMenu.length===0){
                                path = menu[0].url;
                            }else{
                                path = menu[0].url+menu[0].childMenu[0].url;
                            }
                            CurrentSessionCache.set("LOGIN_STATUS",true);//已登入
                            dispatch(push(path));//跳转第一个菜单
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