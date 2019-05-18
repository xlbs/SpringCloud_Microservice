import {Ajax} from "./Ajax";
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
    const dataDict = CurrentSessionCache.get("DATA_DICT");
    if(dataDict instanceof Array){
        for (let i=0; i<dataDict.length; i++){
            if(category==dataDict[i].category){
                dataDict[i].list.map(item => {
                    if(value == item.code){
                        result = item.value
                    }
                })
            }
        }
    }else{
        if(category==dataDict.category){
            dataDict.list.map(item => {
                if(value == item.code){
                    result = item.value
                }
            })
        }
    }
    return result
}

export function DataDict(category,dispatch) {
    let arr = [];
    const historyDataDict = CurrentSessionCache.get("DATA_DICT");
    if(historyDataDict){
        let historyCategoryArr = [];
        if(historyDataDict instanceof Array){
            for(let i=0; i<historyDataDict.length; i++){
                historyCategoryArr.push(historyDataDict[i].category);
            }
        }else{
            historyCategoryArr.push(historyDataDict.category);
        }
        if(category instanceof Array){
            for (let j=0; j<category.length; j++){
                if(!isInArray(historyCategoryArr,category[j])){
                    arr.push(category[j]);
                }
            }
        }else{
            if(!isInArray(historyCategoryArr,category)){
                arr.push(category);
            }
        }
    }else{
        if(category instanceof Array){
            arr = category;
        }else{
            arr.push(category);
        }
    }
    if(arr.length>0){
        let url = API_SERVICE + "/dataDict";
        if(arr.length>1){
            url = url+"/find?category="+arr;
        }else{
            url = url+"/"+arr[0];
        }
        Ajax.get(
            url,
            (res)=>{
                CurrentSessionCache.add("DATA_DICT",res.data);
            },
            dispatch
        );
    }
}