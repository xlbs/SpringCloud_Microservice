import {SET_CURRENT_PAGE, SET_PAGE_SIZE, currentPage, pageSize} from "../../../../commutils/actions/Pagination";
import {OPEN_DIALOG, CLOSE_DIALOG} from "../../../../commutils/actions/Dialog";
import {LIST,INFO,MENUS} from "./RoleAction";

const initialState = {
    currentPage,
    pageSize
};
const roleReducer = (state = initialState, action) => {
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

        case MENUS:
            return{
                ...state,
                menus: action.menus
            }
        default:
            return state;
    }
}

export default roleReducer