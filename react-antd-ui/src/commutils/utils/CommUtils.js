import {Ajax} from "./Ajax";

export function findDataDict(category,dispatch) {
    debugger;
    let url = $requestContext.path + "/dataDict";
    if(category && category.length>1){
        url = url+"/find?category="+category
    }else{
        url = url+"/"+category
    }
    Ajax.get(
        url,
        (res)=>{
            console.log(res);
        },
        dispatch
    );
    
}