import { combineReducers } from 'redux';
import login from "../probusiness/comm/login/LoginReducer";
import main from "../probusiness/comm/main/MainReducer";
import home from "../probusiness/comm/home/HomeReducer";
import user from "../probusiness/comm/system/user/UserReducer";
import role from "../probusiness/comm/system/role/RoleReducer";
import menu from "../probusiness/comm/system/menu/MenuReducer";

const reducers = combineReducers({
    login,
    main,
    home,
    user,
    role,
    menu
})

export default reducers;