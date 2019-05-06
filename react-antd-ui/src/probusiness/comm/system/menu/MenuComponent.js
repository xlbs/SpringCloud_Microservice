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
        // this.props.user.findUserList();
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

        const data = [{
            key: 1,
            name: 'John Brown sr.',
            age: 60,
            address: 'New York No. 1 Lake Park',
            children: [{
                key: 11,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park',
            }, {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park',
                children: [{
                    key: 121,
                    name: 'Jimmy Brown',
                    age: 16,
                    address: 'New York No. 3 Lake Park',
                }],
            }, {
                key: 13,
                name: 'Jim Green sr.',
                age: 72,
                address: 'London No. 1 Lake Park',
                children: [{
                    key: 131,
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park',
                    children: [{
                        key: 1311,
                        name: 'Jim Green jr.',
                        age: 25,
                        address: 'London No. 3 Lake Park',
                    }, {
                        key: 1312,
                        name: 'Jimmy Green sr.',
                        age: 18,
                        address: 'London No. 4 Lake Park',
                    }],
                }],
            }],
        }, {
            key: 2,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }];

        const rowSelection = {
            // onChange: (selectedRowKeys, selectedRows) => {
            //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            // },
            // onSelect: (record, selected, selectedRows) => {
            //     console.log(record, selected, selectedRows);
            // },
            // onSelectAll: (selected, selectedRows, changeRows) => {
            //     console.log(selected, selectedRows, changeRows);
            // },
        };

        return (
            <div>
                <Button type="primary">
                    菜单管理
                </Button>
                <Table
                    columns={this.state.columns}
                    dataSource={data}
                    rowSelection = {rowSelection}
                    bordered
                />
            </div>
        )
    }
}

export default MenuComponent;