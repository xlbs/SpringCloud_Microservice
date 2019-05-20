import React from 'react';
import { Table } from 'antd';
import { objToArray, objToArrayKey, formatDate, formatDataDict } from "../../utils/CommUtils";

export default ({ ...props }) =>{
    const { dataSource, format} = props;
    if(format){
        const keys = objToArrayKey(format);
        const arrs = objToArray(format);
        if(dataSource){
            for (let i=0; i<dataSource.length; i++){
                for (let j=0; j<keys.length; j++){
                    for(let m=0; m<arrs.length; m++){
                        if(arrs[m][keys[j]]){
                            if(arrs[m][keys[j]]=="DATE"){ //是否是时间格式
                                if(dataSource[i][keys[j]]){
                                    dataSource[i][keys[j]] = formatDate(parseInt(dataSource[i][keys[j]]));
                                }
                            }else if(arrs[m][keys[j]].indexOf("DATA_DICT") != -1){ //包含DATA_DICT
                                const category = arrs[m][keys[j]].split(".");
                                dataSource[i][keys[j]] = formatDataDict(category[1],dataSource[i][keys[j]]);
                            }
                        }
                    }
                }
            }
        }
    }

    return(
        <Table
            dataSource={dataSource}
            {...props}
        />
    )
}

