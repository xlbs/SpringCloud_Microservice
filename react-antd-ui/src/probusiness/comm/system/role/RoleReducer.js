import {SET_CURRENT_PAGE, SET_PAGE_SIZE, currentPage, pageSize} from "../../../../commutils/actions/Pagination";
import {OPEN_DIALOG, CLOSE_DIALOG} from "../../../../commutils/actions/Dialog";
import {ROLE_LIST,MENUS,ROLE_INFO,USER_ROLES} from "./RoleAction";

const initialState = {
    currentPage,
    pageSize
};
const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROLE_LIST:
            return{
                ...state,
                roleList: action.roleList
            }
        case MENUS:
            return{
                ...state,
                menus: action.menus
            }
        case ROLE_INFO:
            return{
                ...state,
                roleInfo: action.roleInfo
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