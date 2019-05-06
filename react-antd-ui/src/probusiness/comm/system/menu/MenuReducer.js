import {MENU_LIST} from "./MenuAction";

const initialState = {};

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case MENU_LIST:
            return{
                ...state,
                menuList: action.menuList
            }
        default:
            return state;
    }
}

export default menuReducer