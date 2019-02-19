export const MESSAGE_DIALOG = "MESSAGE_DIALOG";

export function closeMessageDialog() {
    return {
        type: MESSAGE_DIALOG,
        payload: {
            open: false,
            message: ""
        }
    }
    
}