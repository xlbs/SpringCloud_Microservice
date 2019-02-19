import {MESSAGE_DIALOG} from "../actions/MessageDialogAction";

export default messageDialogReducer = (state, action) => {
    switch (action.type){
        case MESSAGE_DIALOG:
            return{
                ...state,
                messageDialog: action.payload
            }
        default:
            return{
                ...state
            }


    }
}