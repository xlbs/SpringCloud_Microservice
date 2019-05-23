import {Ajax} from "../../../../commutils/utils/Ajax";
import {showConfirm, showInfo} from "../../../../commutils/components/dialog/MessageDialog";
import {currentPage, pageSize, setCurrentPage, setPageSize} from "../../../../commutils/actions/Pagination";
import {openDialog, closeDialog} from "../../../../commutils/actions/Dialog";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";

export const MENU_LIST = "MENU_LIST";

/**
 * 查找所有菜单
 * @returns {Function}
 */
function find() {
    const url = API_SERVICE+"/menu/find";
    const params = {
        currentPage: currentPage,
        pageSize: pageSize
    };
    return (dispatch) => {
        Ajax.post(
            {url,params},
            (res)=>{
                dispatch({
                    type: MENU_LIST,
                    menuList: res.data
                })
            },
            dispatch
        )
    }
}

/**
 * 新增角色
 * @returns {Function}
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
 * @param id
 * @param name
 * @returns {Function}
 */
function remove(id,name) {
    return (dispatch) => {
        showConfirm("确定删除角色: "+name,
            ()=>{
                if(id === 1){
                    showInfo("超级管理员无法删除");
                    return;
                }
                const url = API_SERVICE+"/role/delete/"+id;
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
 * 保存角色
 * @param values
 */
function save(values) {
    let url = API_SERVICE+"/role/save";
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

export const actions = {
    find,
    add,
    edit,
    remove,
    save,
    setCurrentPage,
    setPageSize,
    closeDialog,
}