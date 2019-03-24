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

export function findDataDict(category,dispatch) {
    debugger;
    let arr = [];
    const DATA_DICT = CurrentSessionCache.get("DATA_DICT");
    if(DATA_DICT){
        let nowDataDictArr = [];
        for(let i=0; i<DATA_DICT.length; i++){
            nowDataDictArr.push(DATA_DICT[i].category);
        }
        for (let j=0; j<category.length; j++){
            if(!isInArray(nowDataDictArr,category[j])){
                arr.push(category[j]);
            }

        }
    }else{
        arr = category;
    }
    if(arr.length>0){
        let url = $requestContext.path + "/dataDict";
        if(arr.length>1){
            url = url+"/find?category="+arr
        }else{
            url = url+"/"+arr
        }
        Ajax.get(
            url,
            (res)=>{
                CurrentSessionCache.add("DATA_DICT",res.dat);a
            },
            dispatch
        );
    }
}