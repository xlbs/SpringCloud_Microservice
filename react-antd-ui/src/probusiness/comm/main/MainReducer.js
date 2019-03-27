import {LOGIN_FAIL, TIME_OUT} from "../../../commutils/actions/Login";

const initState = {
    username: '',
    userNameDisabled: false,
    passwordDisabled: false,
    errorMsg: '',
    isTimeOut: false
}

const mainReducer = (state = initState, action) =>{
    switch (action.type){
        case LOGIN_FAIL:
            return{
                ...state,
                errorMsg: action.errorMsg
            }
        case TIME_OUT:
            return{
                ...state,
                isTimeOut: action.isTimeOut,
                errorMsg: action.errorMsg,
                username: action.username,
                userNameDisabled: action.userNameDisabled,
            }
        default:
            return{
                ...state
            }


    }
}

export default mainReducer;