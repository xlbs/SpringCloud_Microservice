import {SET_CURRENT_PAGE, SET_PAGE_SIZE, currentPage, pageSize} from "../../../../commutils/actions/Pagination";
import {OPEN_DIALOG, CLOSE_DIALOG} from "../../../../commutils/actions/Dialog";
import {USER_LIST,MENUS,USER_INFO,USER_ROLES} from "./RoleAction";

const initialState = {
    currentPage,
    pageSize
};
const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LIST:
            return{
                ...state,
                userList: action.userList
            }
        case MENUS:
            return{
                ...state,
                menus: action.menus
            }
        case USER_INFO:
            return{
                ...state,
                userInfo: action.userInfo
            }
        case USER_ROLES:
            return{
                ...state,
                userRoles: action.userRoles
            }
        case SET_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.currentPage
            }
        case SET_PAGE_SIZE:
            return{
                ...state,
                pageSize: action.pageSize
            }
        case OPEN_DIALOG:
            return{
                ...state,
                dialog: {
                    open: action.open,
                    title: action.title,
                    content: action.content,
                }
            }
        case CLOSE_DIALOG:
            return{
                ...state,
                dialog: {
                    open: action.open,
                }
            }
        default:
            return state;
    }
}

export default roleReducer