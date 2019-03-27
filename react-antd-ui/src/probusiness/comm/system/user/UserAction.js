import {Ajax} from "../../../../commutils/utils/Ajax";

export const USER_LIST = "USER_LIST";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";
const EXCEL_SERVICE = BASE_URL + "/excel_service";


/**
 * 查询用户数据
 * @returns {Function}
 */
function findUserList() {
    return (dispatch) => {
        Ajax.get(
            API_SERVICE+"/user/findUserList",
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
    exportUserInfo
}