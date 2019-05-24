import React from 'react';
import { Select } from 'antd';
import {CurrentSessionCache} from "../../utils/CurrentCache";

const Option = Select.Option;

/**
 * 普通下拉框
 * @param items
 * @param props
 * @returns {*}
 * @constructor
 */
export const CommSelect = ({ items, ...props }) => {
    const { defaultValue } = props;
    if(!defaultValue && items.length != 0){
        props.defaultValue=items[0].id;
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
                            <Option value={item.id}>{item.name}</Option>
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
    const dataDict = CurrentSessionCache.get("D_"+category);
    if(dataDict){
        items = dataDict;
    }
    return(
        select({ items, ...props })
    )
}

const select = ({ items, ...props }) => {
    const { defaultValue } = props;
    if(!defaultValue && items.length != 0){
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