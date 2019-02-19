import {CurrentUser} from "../../commutils/utils/CurrentUser";
import {LOGIN_FAIL, PASSWORD, TIME_OUT, USER_NAME} from "../../commutils/actions/Login";

const initState = {
    userName: CurrentUser.get().data.userNo,
    password: '',
    errorMsg: '会话超时，请重新登入！',
    userNameDisabled: true,
    passwordDisabled: false,
    isTimeOut: false
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
        case TIME_OUT:
            return{
                ...state,
                isTimeOut: action.isTimeOut
            }
        default:
            return{
                ...state
            }


    }
}

export default reducer;