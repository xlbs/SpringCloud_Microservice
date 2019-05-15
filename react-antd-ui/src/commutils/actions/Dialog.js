export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

export function openDialog(title,content) {
    return {
        type: OPEN_DIALOG,
        open: true,
        title: title,
        content: content,
    }
}


/**
 * 关闭对话框
 * @returns {{type: string, open: boolean}}
 */
export function closeDialog() {
    return {
        type: CLOSE_DIALOG,
        open: false,
    }
}