import {push} from "react-router-redux";
import {Ajax} from "../../commutils/utils/Ajax";
import {CurrentSessionCache} from "../../commutils/utils/CurrentCache";
import {setErrorMsg, hiddenLoginBox} from "../../commutils/actions/Login";
import {showConfirm} from "../../commutils/components/dialog/MessageDialog";

const BASE_URL = $requestContext.path;

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
                debugger;
                CurrentSessionCache.set("USER",res);
                if(res.userId || res.userId===0){
                    url = BASE_URL + "/menu/"+res.userId;
                    Ajax.get(
                        url,
                        (menu) =>{
                            CurrentSessionCache.set("MENU",menu);
                            sessionStorage.setItem("isLogin","1");//已登入
                            dispatch(hiddenLoginBox());
                        },
                        dispatch
                    );
                }
            },
            dispatch
        )
    }

    // return (dispatch) => AjaxPromise(url,config).then(res => {
    //     if (res.status=='success') {
    //         CurrentSessionCache.set("USER",res.user);
    //         url = BASE_URL + "/menu/"+res.user.userId;
    //         Ajax.get(url,
    //             (menu) =>{
    //                 CurrentSessionCache.set("MENU",menu.data);
    //                 sessionStorage.setItem("isLogin","1");//已登入
    //                 dispatch(hiddenLoginBox());
    //             },
    //             dispatch
    //         );
    //     }else{
    //         dispatch(setErrorMsg(res.message));
    //     }
    // }).catch( ex => {
    //     console.log(ex);
    // })
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