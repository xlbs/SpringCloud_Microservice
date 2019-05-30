import axios from 'axios';
import {Ajax,syncAjax} from "./Ajax";
import { showInfo } from '../components/dialog/MessageDialog';
import {setErrorMsg, showLoginBox} from "../actions/Login";
import {CurrentSessionCache} from "./CurrentCache";

const BASE_URL = $requestContext.path;
const API_SERVICE = BASE_URL + "/api_service";

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
export function isInArray(arr,value){
    for(let i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

/**
 * 对象转数组
 * @param obj
 * @returns {Array}
 */
export function objToArray(obj) {
    const arr = [];
    for (let i in obj) {
        let o = {};
        o[i] = obj[i];
        arr.push(o)
    }
    return arr;
}

/**
 * 对象转数组
 * @param obj
 * @returns {Array} 返回key
 */
export function objToArrayKey(obj) {
    const arr = [];
    for (let i in obj) {
        arr.push(i); //键
    }
    return arr;
}
/**
 * 对象转数组
 * @param obj
 * @returns {Array} 返回value
 */
export function objToArrayValue(obj) {
    const arr = [];
    for (let i in obj) {
        arr.push(obj[i]); //值
    }
    return arr;
}

/**
 * 格式化时间戳
 * @param timestamp
 * @returns {string}
 */
export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear() + '-';
    const month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const day = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) +' ';
    const hour = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    const minute = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    const second = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return year+month+day+hour+minute+second;
}

/**
 * 格式化字典表
 * @param category
 * @param value
 * @returns {string}
 */
export function formatDataDict(category,value) {
    let result = "";
    const dataDict = CurrentSessionCache.get("D_"+category);
    if(dataDict){
        if(dataDict instanceof Array){
            dataDict.map(item => {
                if(value == item.code){
                    result = item.value
                }
            })
        }
    }
    return result
}

/**
 * 查询字典表数据
 * @param category
 * @param dispatch
 * @returns {Array}
 * @constructor
 */
export function DataDict(category,dispatch) {
    let result = {};
    let arr = [];
    if(category instanceof Array){
        category.map(item => {
            let dataDict = CurrentSessionCache.get("D_"+item);
            if(dataDict){
                result[item] = dataDict;
            }else{
                arr.push(item);
            }
        })
    }else{
        let dataDict = CurrentSessionCache.get("D_"+category);
        if(dataDict){
            result[category] = dataDict;
        }else{
            arr.push(category);
        }
    }
    if(arr.length>0){
        let url = API_SERVICE + "/dataDict/find?category="+arr;
        Ajax.get(
            url,
            (res)=>{
                if(res.data){
                    res.data.map(item => {
                        CurrentSessionCache.set("D_"+item.category, item.list);
                        result[item.category] = item.list;
                    });
                }
            },
            dispatch
        );
    }
    return result;
}

/**
 * 同步查找字典表数据
 * @param category
 * @param dispatch
 * @returns {Promise<any>} 返回Promise
 * @constructor
 */
export function DataDictPromise(category,dispatch) {
    let result = {};
    let arr = [];
    if(category instanceof Array){
        category.map(item => {
            let dataDict = CurrentSessionCache.get("D_"+item);
            if(dataDict){
                result[item] = dataDict;
            }else{
                arr.push(item);
            }
        })
    }else{
        let dataDict = CurrentSessionCache.get("D_"+category);
        if(dataDict){
            result[category] = dataDict;
        }else{
            arr.push(category);
        }
    }
    return new Promise((resolve)=>{
        if(arr.length>0){
            let url = API_SERVICE + "/dataDict/find?category="+arr;
            axios({url: url}).then(function(response){
                if(response && response.data && response.data.code===1){
                    if(response.data.data){
                        response.data.data.map(item => {
                            CurrentSessionCache.set("D_"+item.category, item.list);
                            result[item.category] = item.list;
                        });
                        resolve(result);
                    }
                }else if(response.data.code===20001 || response.data.code===20002){
                    dispatch(setErrorMsg(response.data.msg));
                }else{
                    showInfo(response.data.msg);
                }
            }).catch(function(error){
                if(error.response.data.status===10000){
                    dispatch(showLoginBox());
                }else{
                    showInfo("未知错误,请求支援");
                }
            })
        }else{
            resolve(result);
        }

    })
}

/**
 * 同步查找字典表数据
 * @param category
 * @param dispatch
 * @returns {Array} 返回数组
 * @constructor
 */
export async function syncDataDict(category,dispatch) {
    let result = [];
    let objCategory = {};
    if(category instanceof Array){
        category.map(item => {
            objCategory[item] = false;
        })
    }else{
        objCategory[category] = false;
    }
    const objCategoryArr = objToArrayKey(objCategory);
    const historyDataDict = CurrentSessionCache.get("DATA_DICT");
    if(historyDataDict){
        if(historyDataDict instanceof Array){
            for(let i=0; i<historyDataDict.length; i++){
                objCategoryArr.map(category => {
                    if(category==historyDataDict[i].category){
                        objCategory[category] = true;
                        result.push(historyDataDict[i]);
                    }
                })
            }
        }else{
            objCategoryArr.map(category => {
                if(category==historyDataDict.category){
                    objCategory[category] = true;
                    result.push(historyDataDict)
                }
            })
        }
    }
    let arr = [];
    objCategoryArr.map(category => {
        if(!objCategory[category]){
            arr.push(category);
        }
    });
    if(arr.length>0){
        let url = API_SERVICE + "/dataDict/find?category="+arr;
        await syncAjax.get(
            url,
            (res)=>{
                CurrentSessionCache.add("DATA_DICT",res.data);
                if(res.data instanceof Array){
                    res.data.map(item => {
                        result.push(item);
                    })
                }else{
                    result.push(res.data);
                }
            },
            dispatch
        );
    }
    return result;
}