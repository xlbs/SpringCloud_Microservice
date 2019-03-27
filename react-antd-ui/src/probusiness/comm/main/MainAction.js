import {push} from "react-router-redux";
import {Ajax} from "../../../commutils/utils/Ajax";
import {CurrentSessionCache} from "../../../commutils/utils/CurrentCache";
import {setErrorMsg, hiddenLoginBox} from "../../../commutils/actions/Login";
import {showConfirm} from "../../../commutils/components/dialog/MessageDialog";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";

/**
 * 登入操作
 * @param user
 * @returns {function(*): Promise<any>}
 */
function login(user) {
    let url = BASE_URL + "/loginB";
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
                    url = API_SERVICE + "/menu/"+res.userId;
                    Ajax.get(
                        url,
                        (menu) =>{
                            CurrentSessionCache.set("MENU",menu);
                            CurrentSessionCache.set("LOGIN_STATUS",true);//已登入
                            dispatch(hiddenLoginBox());
                        },
                        dispatch
                    );
                }
            },
            dispatch
        )
    }
}

/**
 * 退出登入
 * @returns {Function}
 */
function exitLogin() {
    return (dispatch) => {
        showConfirm("是否确定退出？",
            ()=>{//确定
                CurrentSessionCache.clear();
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