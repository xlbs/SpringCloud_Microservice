import {currentPage, pageSize, SET_CURRENT_PAGE, SET_PAGE_SIZE} from "../../../../commutils/actions/Pagination";
import {CLOSE_DIALOG, OPEN_DIALOG} from "../../../../commutils/actions/Dialog";
import {LIST, PARENT_MENUS, INFO} from "./MenuAction";

const initialState = {
    currentPage,
    pageSize
};
const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST:
            return{
                ...state,
                list: action.list
            }
        case INFO:
            return{
                ...state,
                info: action.info
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

        case PARENT_MENUS:
            return{
                ...state,
                parentMenus: action.parentMenus
            }
        default:
            return state;
    }
}

export default menuReducer