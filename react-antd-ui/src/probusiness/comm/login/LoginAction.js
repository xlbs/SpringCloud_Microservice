import {push} from 'react-router-redux';
import {CurrentSessionCache} from "../../../commutils/utils/CurrentCache";
import {Ajax} from "../../../commutils/utils/Ajax";
import {setErrorMsg} from "../../../commutils/actions/Login";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";

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
                CurrentSessionCache.set("USER",res.data);
                if(res.data.userId || res.data.userId===0){
                    url = API_SERVICE + "/menu/"+res.data.userId;
                    Ajax.get(
                        url,
                        (menu) =>{
                            if(menu.data){
                                CurrentSessionCache.set("MENU",menu.data);
                                let path;
                                if(menu.data[0].children.length===0){
                                    path = menu.data[0].url;
                                }else{
                                    path = menu.data[0].url+menu.data[0].children[0].url;
                                }
                                CurrentSessionCache.set("LOGIN_STATUS",true);//已登入
                                dispatch(push(path));//跳转第一个菜单
                            }else{
                                dispatch(setErrorMsg("加载菜单失败，请检查用户权限!"));
                            }

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