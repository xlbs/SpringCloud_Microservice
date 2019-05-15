import {push} from "react-router-redux";
import {Ajax} from "../../../commutils/utils/Ajax";
import {CurrentSessionCache} from "../../../commutils/utils/CurrentCache";
import {setErrorMsg, hiddenLoginBox} from "../../../commutils/actions/Login";
import {showConfirm,showInfo} from "../../../commutils/components/dialog/MessageDialog";

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
                CurrentSessionCache.set("USER",res.data);
                if(res.data.userId || res.data.userId===0){
                    url = API_SERVICE + "/menu/"+res.data.userId;
                    Ajax.get(
                        url,
                        (menu) =>{
                            if(menu.data){
                                CurrentSessionCache.set("MENU",menu.data);
                                CurrentSessionCache.set("LOGIN_STATUS",true);//已登入
                                dispatch(hiddenLoginBox());
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

/**
 * 退出
 * @returns {Function}
 */
function exit() {
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

/**
 * 清理缓存
 * @returns {Function}
 */
function clearCache() {
    return (dispatch) => {
        showConfirm("是否确定清理缓存？",
            ()=>{//确定
                let url = API_SERVICE + "/system/clearCache";
                Ajax.delete(
                    url,
                    (res) =>{
                        showInfo(res.msg);
                    },
                    dispatch
                )
                CurrentSessionCache.clear();
                // dispatch(push("/login"));//跳转到登入页
            }
        )
    }
}




export const actions = {
    login,
    exit,
    clearCache,
    setErrorMsg,
    hiddenLoginBox
}