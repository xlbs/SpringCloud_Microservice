import {Ajax} from "./Ajax";
import {CurrentSessionCache} from "./CurrentCache";

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr,value){
    for(let i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
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
        let url = $requestContext.path + "/dataDict";
        if(arr.length>1){
            url = url+"/find?category="+arr;
        }else{
            url = url+"/"+arr[0];
        }
        Ajax.get(
            url,
            (res)=>{
                CurrentSessionCache.add("DATA_DICT",res);
            },
            dispatch
        );
    }
}