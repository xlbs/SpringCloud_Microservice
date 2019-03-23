import { combineReducers } from 'redux';
import login from "../probusiness/login/LoginReducer";
import main from "../probusiness/main/MainReducer";
import home from "../probusiness/home/HomeReducer";
import user from "../probusiness/system/user/UserReducer";
import role from "../probusiness/system/role/RoleReducer";
import menu from "../probusiness/system/menu/MenuReducer";

const reducers = combineReducers({
    login,
    main,
    home,
    user,
    role,
    menu
})

export default reducers;