import {USER_LIST} from "./UserAction";

const initialState = {

}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LIST:
            return{
                ...state,
                userList: action.userList
            }
        default:
            return state;
    }
}

export default userReducer