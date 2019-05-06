import {USER_LIST,ADD_USER,EDIT_USER,ROLES,USER_INFO,USER_ROLES,CLOSE_DIALOG} from "./UserAction";

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
        default:
            return state;
    }
}

export default userReducer