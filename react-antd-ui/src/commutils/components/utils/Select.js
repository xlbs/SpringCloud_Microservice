import React from 'react';
import { Select } from 'antd';
import {CurrentSessionCache} from "../../utils/CurrentCache";

const Option = Select.Option;


const select = ({ items, ...props }) => {
    const { defaultValue } = props;
    if(!defaultValue){
        props.defaultValue=items[0].code;
    }
    if(items.length===0){
        return(
            <Select {...props}>
            </Select>
        )
    }else {
        return(
            <Select {...props}>
                {
                    items.map(item => {
                        return(
                            <Option value={item.code}>{item.value}</Option>
                        )
                    })
                }
            </Select>
        )
    }
}

/**
 * 字典表下拉框
 * @param category
 * @param props
 * @returns {*}
 * @constructor
 */
export const DictSelect = ({ category, ...props }) => {
    let items = [];
    const dataDict = CurrentSessionCache.get("DATA_DICT");
    if(dataDict instanceof Array){
        dataDict.map( item => {
            if(item.category == category){
                items = item.list;
            }
        })
    }else{
        if(dataDict.category == category){
            items = dataDict.list;
        }
    }
    return(
        select({ items, ...props })
    )

}