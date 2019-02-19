import {MESSAGE_DIALOG} from "../actions/MessageDialogAction";

/**
 * 提示消息框
 * @param msg
 */
export function promptMessage(msg) {
    return (dispatch) => dispatch({
            type: MESSAGE_DIALOG,
            payload: {
                open: true,
                message: msg
            }
    })
}