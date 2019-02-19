import { combineReducers } from 'redux';
import loginReducer from "../probusiness/login/LoginReducer";
import mainReducer from "../probusiness/main/MainReducer";
import homeReducer from "../probusiness/home/homeReducer";

const reducers = combineReducers({
    loginReducer,
    mainReducer,
    homeReducer
})

export default reducers;