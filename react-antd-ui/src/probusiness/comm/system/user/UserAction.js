import {Ajax} from "../../../../commutils/utils/Ajax";
import {showInfo} from "../../../../commutils/components/dialog/MessageDialog";

export const USER_LIST = "USER_LIST";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const ROLES = "ROLES";
export const USER_INFO = "USER_INFO";
export const USER_ROLES = "USER_ROLES";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";
const EXCEL_SERVICE = BASE_URL + "/excel_service";


/**
 * 查询用户数据列表
 * @returns {Function}
 */
function findUserList() {
    const url = API_SERVICE+"/user/findUserList";
    const params = {
        username: "ff",
        name: "dd"
    };
    return (dispatch) => {
        Ajax.post(
            {url,params},
            (res)=>{
                dispatch({
                    type: USER_LIST,
                    userList: res
                })
            },
            dispatch
        )
    }
}

/**
 * 新增用户
 * @returns {{type: string, open: boolean, content: string}}
 */
function addUser() {
    return {
        type: ADD_USER,
        open: true,
        content: "新增"
    }
}

/**
 * 编辑用户
 * @returns {{type: string, open: boolean, content: string}}
 */
function editUser(userId) {
    return {
        type: EDIT_USER,
        open: true,
        content: "编辑",
        userId: userId
    }
}


/**
 * 查询所有角色
 */
function findRoles() {
    let url = API_SERVICE+"/role/findRoles";
    return (dispatch) => {
        Ajax.get(
            url,
            (res) =>{
                dispatch({
                    type: ROLES,
                    roles: res
                })
            },
            dispatch
        )
    }
}


/**
 * 查询某个用户信息
 * @param userId
 * @returns {Function}
 */
function findUserInfo(userId) {
    const url = API_SERVICE+"/user/"+userId;
    return (dispatch) =>{
        Ajax.get(
            url,
            (res) =>{
                dispatch({
                    type: USER_INFO,
                    userInfo: res
                })
            }
        )
    }
}

/**
 * 查询某个用户的角色信息
 * @param userId
 * @returns {Function}
 */
// function findUserRoles(userId) {
//     const url = API_SERVICE+"/role/"+userId;
//     return (dispatch) =>{
//         Ajax.get(
//             url,
//             (res) =>{
//                 dispatch({
//                     type: USER_ROLES,
//                     userRoles: res
//                 })
//             }
//         )
//     }
// }

/**
 * 保存用户
 * @param values
 */
function saveUserInfo(values) {
    const url = API_SERVICE+"/user/saveUserInfo";
    const params = values;
    return (dispatch) =>{
        Ajax.post(
            {url,params},
            (res) => {
                dispatch(findUserList());
                dispatch(closeDialog());
                showInfo(res.msg);
            },
            dispatch
        )

    }


}

/**
 * 关闭弹出框
 * @returns {{type: string, open: boolean, content: string}}
 */
function closeDialog() {
    return {
        type: CLOSE_DIALOG,
        open: false,
    }
}

/**
 * 导出
 * @returns {Function}
 */
function exportUserInfo() {
    return (dispatch) => {
        Ajax.get(
            EXCEL_SERVICE+"/user/export",
            (res)=>{

            },
            dispatch
        )
    }
}

export const actions = {
    findUserList,
    addUser,
    findRoles,
    findUserInfo,
    // findUserRoles,
    editUser,
    saveUserInfo,
    exportUserInfo,
    closeDialog
}