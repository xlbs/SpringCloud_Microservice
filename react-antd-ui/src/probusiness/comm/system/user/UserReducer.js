import {USER_LIST,ADD_USER,EDIT_USER,CLOSE_DIALOG} from "./UserAction";

const initialState = {

}
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
                    content: action.content
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

export default userReducer