import {Ajax} from "../../../../commutils/utils/Ajax";
import {showConfirm, showInfo} from "../../../../commutils/components/dialog/MessageDialog";
import {currentPage, pageSize, setCurrentPage, setPageSize} from "../../../../commutils/actions/Pagination";
import {openDialog, closeDialog} from "../../../../commutils/actions/Dialog";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";
const EXCEL_SERVICE = BASE_URL + "/excel_service";

export const ROLE_LIST = "ROLE_LIST";
export const MENUS = "MENUS";
export const ROLE_INFO = "ROLE_INFO";
export const USER_ROLES = "USER_ROLES";

/**
 * 查询角色数据列表
 * @returns {Function}
 */
function find() {
    const url = API_SERVICE+"/role/find";
    const params = {
        currentPage: currentPage,
        pageSize: pageSize
    };
    return (dispatch) => {
        Ajax.post(
            {url,params},
            (res)=>{
                dispatch({
                    type: ROLE_LIST,
                    roleList: res.data
                })
            },
            dispatch
        )
    }
}

/**
 * 新增角色
 * @returns {{type: string, open: boolean, content: string}}
 */
function add() {
    return (dispatch) => {
        dispatch(openDialog("新增"))
    }
}

/**
 * 编辑角色
 * @param id 角色Id
 * @returns {Function}
 */
function edit(id) {
    let content ={
        id: id
    }
    return (dispatch) => {
        dispatch(openDialog("编辑",content))
    }
}

/**
 * 删除角色
 * @param userId
 */
function remove(userId,username) {
    return (dispatch) => {
        showConfirm("确定删除账号为: "+username+" 的用户？",
            ()=>{
                if(userId===1){
                    showInfo("超级用户无法删除");
                    return;
                }
                const url = API_SERVICE+"/user/delete/"+userId;
                Ajax.get(
                    url,
                    (res) => {
                        dispatch(find());
                        showInfo(res.msg);
                    },
                    dispatch
                )
            },
            ()=>{}
        )
    }
}


/**
 * 查询所有菜单
 */
function findMenus() {
    let url = API_SERVICE+"/menu";
    return (dispatch) => {
        Ajax.get(
            url,
            (res) =>{
                dispatch({
                    type: MENUS,
                    menus: res.data
                })
            },
            dispatch
        )
    }
}

/**
 * 查询某个角色信息
 * @param id 角色Id
 * @returns {Function}
 */
function findRoleInfo(id) {
    const url = API_SERVICE+"/role/find/"+id;
    return (dispatch) =>{
        Ajax.get(
            url,
            (res) =>{
                if(res.data){
                    res.data.render = true;
                    dispatch({
                        type: ROLE_INFO,
                        roleInfo: res.data
                    })
                }

            }
        )
    }
}

/**
 * 保存用户
 * @param values
 */
function saveUserInfo(values) {
    let url = API_SERVICE+"/user/saveUserInfo";
    if(values.id){
        url = url +"?isEdit=true"
    }
    const params = values;
    return (dispatch) =>{
        Ajax.post(
            {url,params},
            (res) => {
                dispatch(find());
                dispatch(closeDialog());
                showInfo(res.msg);
            },
            dispatch
        )

    }
}

/**
 * 导出
 * @returns {Function}
 */
function exportUserInfo() {
    return (dispatch) => {
        Ajax.get(
            EXCEL_SERVICE+"/user/export",
            (res)=>{

            },
            dispatch
        )
    }
}


export const actions = {
    find,
    add,
    edit,
    remove,
    findMenus,
    findRoleInfo,
    saveUserInfo,
    exportUserInfo,
    setCurrentPage,
    setPageSize,
    closeDialog,
}