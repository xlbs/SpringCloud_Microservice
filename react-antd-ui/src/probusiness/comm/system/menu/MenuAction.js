import {Ajax} from "../../../../commutils/utils/Ajax";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";

export const MENU_LIST = "MENU_LIST";

/**
 * 查找所有菜单
 * @returns {Function}
 */
function findMenuList() {
    const url = API_SERVICE+"/menu";
    return (dispatch) => {
        Ajax.get(
            url,
            (res)=>{
                dispatch({
                    type: MENU_LIST,
                    menuList: res.data
                })
            },
            dispatch
        )
    }
}

export const actions = {
    findMenuList,
}