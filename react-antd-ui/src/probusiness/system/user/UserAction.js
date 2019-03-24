import {Ajax} from "../../../commutils/utils/Ajax";

export const USER_LIST = "USER_LIST";

const BASE_URL = $requestContext.path + "/user";

/**
 * 查询用户数据
 * @returns {Function}
 */
function findUserList() {
    return (dispatch) => {
        Ajax.get(
            BASE_URL+"/findUserList",
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
            $requestContext.path+"/export/exportUserInfo",
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