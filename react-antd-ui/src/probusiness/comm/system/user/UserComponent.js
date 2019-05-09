import React from 'react';
import { Button, Table, Divider, Pagination } from 'antd';
import CreateTable from '../../../../commutils/components/CreateTable';
import '../../../../statics/css/system/user/user.css';
import {DataDict} from "../../../../commutils/utils/CommUtils"
import UserModalDialog from "./UserModalDialog";


class UserComponent extends React.Component{

    constructor(props){
        super(props);
        const columns = [
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
            {title: '账号',dataIndex: 'username'},
            {title: '姓名',dataIndex: 'name'},
            {title: '类型',dataIndex: 'type'},
            {title: '所拥有角色',dataIndex: 'roleNames'},
            {title: '创建人',dataIndex: 'createdBy'},
            {title: '创建时间',dataIndex: 'createdDate'},
            {title: '最后修改人',dataIndex: 'lastModifyBy'},
            {title: '最后修改时间',dataIndex: 'lastModifyDate'},
        ];
        const dataDict = ["USER_TYPE"];
        this.state = {
            columns: columns,
            dataDict: dataDict
        };
        DataDict(dataDict,this.props.user.dispatch);
    }

    componentWillMount() {
        this.props.user.findUserList();
    }

    //新增
    addUser(){
        this.props.user.addUser();
    }

    //编辑
    editUser(userId){
        this.props.user.editUser(userId);
    }

    //删除
    deleteUser(userId,username){
        this.props.user.deleteUser(userId,username);
    }

    //导出
    exportUserInfo(){
        this.props.user.exportUserInfo();
    }

    render() {
        const props = this.props.user;
        const dataSource = props.userList;
        debugger;
        return (
            <div id="user" className="user">
                <Button type="primary" onClick={this.addUser.bind(this)}>新增</Button>
                <Button type="primary" onClick={this.exportUserInfo.bind(this)}>导出</Button>

                {props.dialog && props.dialog.open? <UserModalDialog modalDialog={props}/> : ""}

                <CreateTable
                    columns={this.state.columns}
                    dataSource={dataSource}
                    pagination={false}
                    bordered
                />
                <Pagination
                    showSizeChanger
                    // onShowSizeChange={onShowSizeChange}
                    defaultCurrent={6}
                    total={500}
                />

                {/*<Table*/}
                    {/*columns={this.state.columns}*/}
                    {/*dataSource={dataSource}*/}
                    {/*pagination={{ pageSize: 5 }}*/}
                    {/*bordered*/}
                {/*/>*/}
            </div>
        )
    }


}

export default UserComponent;