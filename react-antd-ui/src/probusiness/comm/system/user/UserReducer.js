import {
    USER_LIST,
    ADD_USER,
    EDIT_USER,
    ROLES,
    USER_INFO,
    USER_ROLES,
    CLOSE_DIALOG,
    SET_CURRENT_PAGE,
    SET_PAGE_SIZE,
} from "./UserAction";

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LIST:
            return{
                ...state,
                userList: action.userList
            }
        case ADD_USER:
            return{
                ...state,
                dialog: {
                    open: action.open,
                    content: action.content
                }
            }
        case EDIT_USER:
            return{
                ...state,
                dialog: {
                    open: action.open,
                    content: action.content,
                    userId: action.userId
                }
            }
        case ROLES:
            return{
                ...state,
                roles: action.roles
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
        case CLOSE_DIALOG:
            return{
                ...state,
                dialog: {
                    open: action.open,
                }
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
        default:
            return state;
    }
}

export default userReducer