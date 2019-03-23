import {Ajax} from "../../../commutils/utils/Ajax";

export const USER_LIST = "USER_LIST";

let url = $requestContext.path + "/user"

function findUserList() {
    return (dispatch) => {
        Ajax.get(
            url+"/findUserList",
            (res)=>{
                dispatch({
                    type: USER_LIST,
                    userList: res.data
                })
            },
            dispatch
        )
    }
    
}

export const actions = {
    findUserList
}