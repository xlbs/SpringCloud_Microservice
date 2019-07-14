import React from 'react';
import {Ajax} from "../../../../commutils/utils/Ajax";
import {showConfirm, showInfo} from "../../../../commutils/components/dialog/MessageDialog";
import {currentPage, pageSize, setCurrentPage, setPageSize} from "../../../../commutils/actions/Pagination";
import {openDialog, closeDialog} from "../../../../commutils/actions/Dialog";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";

export const LIST = "LIST";
export const INFO = "INFO";
export const PARENT_MENUS = "PARENT_MENUS";

/**
 * 分页查询
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
                    type: LIST,
                    list: res.data
                })
            },
            dispatch
        )
    }
}

/**
 * 新增
 * @returns {Function}
 */
function add() {
    return (dispatch) => {
        dispatch(openDialog("新增"))
    }
}

/**
 * 编辑
 * @param id
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
 * 删除
 * @param id 标识
 * @param name 名称
 * @returns {Function}
 */
function remove(id,name) {
    return (dispatch) => {
        showConfirm(<span>该操作将删除该菜单下的所有子菜单，确定删除<span style={{color:"red"}}>{name}</span>菜单？</span>,
            ()=>{
                const url = API_SERVICE+"/menu/delete/"+id;
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
 * 保存
 * @param values
 * @returns {Function}
 */
function save(values) {
    let url = API_SERVICE+"/menu/save";
    if(values.id){
        url = url +"?isEdit=true"
    }
    values.isEnable = parseInt(values.isEnable);
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
 * 通过id查询信息
 * @param id
 */
function findById(id) {
    const url = API_SERVICE+"/menu/find/"+id;
    return (dispatch) =>{
        Ajax.get(
            url,
            (res) =>{
                if(res.data){
                    res.data.render = true;
                    dispatch({
                        type: INFO,
                        info: res.data
                    })
                }

            }
        )
    }
}

/**
 * 通过等级查询菜单
 * @param rank
 * @returns {Function}
 */
function findMenuByRank(rank,onChange){
    let url = API_SERVICE+"/menu/findMenuByRank?rank="+rank;
    return (dispatch) =>{
        Ajax.get(
            url,
            (res) =>{
                let parentMenus = {};
                parentMenus.onChange = onChange;
                parentMenus.list = res.data;
                if(res.data){
                    dispatch({
                        type: PARENT_MENUS,
                        parentMenus: parentMenus
                    })
                }

            }
        )
    }
}


export const actions = {
    find,add,edit,remove,save,findById,
    setCurrentPage,setPageSize,closeDialog,

    findMenuByRank,
}