import {LOGIN_FAIL, PASSWORD, USER_NAME} from "../../commutils/actions/Login";

const initState = {
    userName: '',
    password: '',
    userNameDisabled: false,
    passwordDisabled: false,
    errorMsg: ''
}

const reducer = (state = initState, action) =>{
    switch (action.type){
        case USER_NAME:
            return{
                ...state,
                userName: action.userName
            }
        case PASSWORD:
            return{
                ...state,
                password: action.password
            }
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

export default reducer;