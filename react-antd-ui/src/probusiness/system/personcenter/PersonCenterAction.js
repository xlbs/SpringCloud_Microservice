import {Ajax} from "../../../commutils/utils/Ajax";

function exportUserInfo() {
    return (dispatch) => {
        const url = $requestContext.path + "/export/exportUserInfo";
        Ajax.post({
            url: url,
            params: {}
        }, (res) => {

        }, dispatch)
    }

}

export const actions = {
    exportUserInfo
}