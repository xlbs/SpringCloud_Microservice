import {USER_LIST,ADD_USER} from "./UserAction";

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
        default:
            return state;
    }
}

export default userReducer