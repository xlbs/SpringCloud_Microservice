import {HOME_1, HOME_2} from "./HomeAction";

const initState = {
    context: ''
}

const reducer = (state = initState, action) =>{
    switch (action.type){
        case HOME_1:
            return{
                ...state,
                context: action.context
            }
        case HOME_2:
            return{
                ...state,
                context: action.context
            }
        default:
            return{
                ...state
            }


    }
}

export default reducer;