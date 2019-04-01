import {Ajax} from "../../../../commutils/utils/Ajax";

export const USER_LIST = "USER_LIST";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";
const EXCEL_SERVICE = BASE_URL + "/excel_service";


/**
 * 查询用户数据
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
function editUser() {
    return {
        type: EDIT_USER,
        open: true,
        content: "新增"
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
    editUser,
    exportUserInfo,
    closeDialog
}