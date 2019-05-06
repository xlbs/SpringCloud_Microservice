import React from 'react';
import { Table, Divider, Button } from 'antd';
import {DataDict} from "../../../../commutils/utils/CommUtils";

class MenuComponent extends React.Component{

    constructor(props){
        super(props);
        const columns = [
            {title: '菜单标识',dataIndex: 'id',width:150},
            {title: '菜单名',dataIndex: 'name'},
            {title: '菜单等级',dataIndex: 'rank'},
            {title: 'URL',dataIndex: 'url'},
            {title: '是否可用',dataIndex: 'isEnable'},
            {title: '创建人',dataIndex: 'createdBy'},
            {title: '创建时间',dataIndex: 'createdDate'},
            {title: '最后修改人',dataIndex: 'lastModifyBy'},
            {title: '最后修改时间',dataIndex: 'lastModifyDate'},
            {title: '操作',key: 'action',width:150,
                render: (row)=>{
                    return(
                        <span>
                            <Button type="primary" size="small" onClick={this.editUser.bind(this,row.userId)} ghost>编辑</Button>
                            <Divider type="vertical" />
                            <Button type="primary" size="small" onClick={this.deleteUser.bind(this,row.userId,row.username)} ghost>删除</Button>
                        </span>
                    )
                }
            },
        ];
        const dataDict = ["USER_TYPE"];
        this.state = {
            columns: columns,
            dataDict: dataDict
        };
        // DataDict(dataDict,this.props.user.dispatch);
    }

    componentWillMount() {
        this.props.menu.findMenuList();
    }

    //编辑
    editUser(userId){
        // this.props.user.editUser(userId);
    }

    //删除
    deleteUser(userId,username){
        // this.props.user.deleteUser(userId,username);
    }

    render() {
        debugger;
        const props = this.props.menu;
        const dataSource = props.menuList;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };

        return (
            <div>
                <Button type="primary">
                    菜单管理
                </Button>
                <Table
                    columns={this.state.columns}
                    dataSource={dataSource}
                    rowSelection = {rowSelection}
                    bordered
                />
            </div>
        )
    }
}

export default MenuComponent;