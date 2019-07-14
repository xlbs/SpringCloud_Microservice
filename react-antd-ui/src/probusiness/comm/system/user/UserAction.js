import React from 'react';
import {Ajax, AjaxPromise} from "../../../../commutils/utils/Ajax";
import {showConfirm, showInfo} from "../../../../commutils/components/dialog/MessageDialog";
import {currentPage, pageSize, setCurrentPage, setPageSize} from "../../../../commutils/actions/Pagination";
import {openDialog, closeDialog} from "../../../../commutils/actions/Dialog";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";
const EXCEL_SERVICE = BASE_URL + "/excel_service";

export const LIST = "LIST";
export const INFO = "INFO";
export const ROLES = "ROLES";
export const USER_ROLES = "USER_ROLES";

/**
 * 分页查询
 * @returns {Function}
 */
function find() {
    const url = API_SERVICE+"/user/find";
    const params = {
        currentPage: currentPage,
        pageSize: pageSize
    };
    const config = {};
    config.method = "GET";
    config.params = params;
    return (dispatch) => AjaxPromise(url,config,dispatch).then(res => {
        dispatch({
            type: LIST,
            list: res.data
        })
    })
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
 * @param id 标识
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
function remove(id,username,name) {
    return (dispatch) => {
        showConfirm(<span>确定删除账号：<span style={{color:"red"}}>{username}({name})</span> 的用户？</span>,
            ()=>{
                if(id===1){
                    showInfo(<span> <span style={{color:"red"}}>{name}</span> 无法删除！</span>);
                    return;
                }
                const url = API_SERVICE+"/user/delete/"+id;
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
    let url = API_SERVICE+"/user/save";
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
function outPut() {
    return (dispatch) => {
        Ajax.get(
            EXCEL_SERVICE+"/user/export",
            (res)=>{

            },
            dispatch
        )
    }
}

/**
 * 通过标识查询信息
 * @param id 标识
 * @returns {Function}
 */
function findById(id) {
    const url = API_SERVICE+"/user/find/"+id;
    return (dispatch) =>{
        Ajax.get(
            url,
            (res) =>{
                dispatch({
                    type: INFO,
                    info: res.data
                })
            }
        )
    }
}


/**
 * 查询所有角色
 */
function findAllRole() {
    let url = API_SERVICE+"/role/all";
    return (dispatch) => {
        Ajax.get(
            url,
            (res) =>{
                dispatch({
                    type: ROLES,
                    roles: res.data
                })
            },
            dispatch
        )
    }
}


export const actions = {
    find,add,edit,remove,save,outPut,findById,
    setCurrentPage,setPageSize,closeDialog,

    findAllRole,
}