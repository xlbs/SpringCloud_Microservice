import { combineReducers } from 'redux';
import login from "../probusiness/login/LoginReducer";
import main from "../probusiness/main/MainReducer";
import home from "../probusiness/home/homeReducer";
import personCenter from "../probusiness/system/personcenter/PersonCenterReducer";

const reducers = combineReducers({
    login,
    main,
    home,
    personCenter
})

export default reducers;