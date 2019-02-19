import {Ajax} from "../../commutils/utils/Ajax";

function homeTest() {
    return (dispatch) => {
        const urlB = $requestContext.path + "/export/exportUserInfo";
        Ajax.post({
            url: urlB,
            params: {}
        }, (res) => {

        }, dispatch)
    }
    
}

export const actions = {
    homeTest
}