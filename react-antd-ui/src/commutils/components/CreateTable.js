import React from 'react';
import { Table } from 'antd';

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear() + '-';
    const month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const day = date.getDate() + ' ';
    const hour = date.getHours() + ':';
    const minute = date.getMinutes() + ':';
    const second = date.getSeconds();
    return year+month+day+hour+minute+second;
}

export default ({ dataSource, ...props }) =>{
    if(dataSource){
        for (let i=0; i<dataSource.length; i++){
            if(dataSource[i].createdDate){
                dataSource[i].createdDate = formatDate(parseInt(dataSource[i].createdDate));
            }
            if(dataSource[i].lastModifyDate){
                dataSource[i].lastModifyDate = formatDate(parseInt(dataSource[i].lastModifyDate));
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

