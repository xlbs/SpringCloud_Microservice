import { showConfirm, showInfo, showSuccess, showError, showWarning } from '../components/dialog/MessageDialog';


export function exitLogin() {
    showConfirm("是否确定退出？",
        ()=>{
            window.location.href="/login";
        },
        ()=>{

        }
    )
}