import {LOGIN_FAIL, PASSWORD, USER_NAME} from "../../../commutils/actions/Login";

const initState = {
    userNameDisabled: false,
    passwordDisabled: false,
    errorMsg: ''
}

const loginReducer = (state = initState, action) =>{
    switch (action.type){
        case LOGIN_FAIL:
            return{
                ...state,
                errorMsg: action.errorMsg
            }
        default:
            return{
                ...state
            }


    }
}

export default loginReducer;