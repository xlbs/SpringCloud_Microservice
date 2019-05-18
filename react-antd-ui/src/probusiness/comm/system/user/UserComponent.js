import React from 'react';
import { Form, Button, Table, Divider, Pagination } from 'antd';
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
            {title: '账号',dataIndex: 'username',width:200},
            {title: '姓名',dataIndex: 'name',width:150},
            {title: '类型',dataIndex: 'type',width:100},
            {title: '所拥有角色',dataIndex: 'roleNames'},
            {title: '创建人',dataIndex: 'createdBy',width:150},
            {title: '创建时间',dataIndex: 'createdDate',width:200},
            {title: '最后修改人',dataIndex: 'lastModifyBy',width:150},
            {title: '最后修改时间',dataIndex: 'lastModifyDate',width:200},
        ];
        DataDict("USER_TYPE",this.props.user.dispatch);
        this.state = {
            columns: columns,
        };
        this.onChange = this.onChange.bind(this)
        this.onShowSizeChange = this.onShowSizeChange.bind(this)
    }

    componentWillMount() {
        this.props.user.findUserList();
    }

    onChange(page, pageSize){
        this.props.user.setCurrentPage(page);
        this.props.user.setPageSize(pageSize);
        this.props.user.findUserList();
    }

    onShowSizeChange(current, size){
        this.props.user.setCurrentPage(current);
        this.props.user.setPageSize(size);
        this.props.user.findUserList();
    }

    showTotal(total, range){
        return `${range[0]}-${range[1]} of ${total}`;
    }

    handleSubmit(e,values){
        e.preventDefault();
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
        const pagination ={
            pageSize: props.pageSize,
            defaultCurrent: props.currentPage,
            pageSizeOptions:[10,20,40,50],
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.onChange,
            onShowSizeChange: this.onShowSizeChange,
            showTotal: this.showTotal,
        };
        let dataSource;
        if(props.userList){
            dataSource = props.userList.list;
            pagination.total = props.userList.total;
        }

        return (
            <div id="user" className="user">
                <Form onSubmit={this.handleSubmit.bind(this)}>

                </Form>

                <Button type="primary" onClick={this.addUser.bind(this)}>新增</Button>
                <Button type="primary" onClick={this.exportUserInfo.bind(this)}>导出</Button>

                {props.dialog && props.dialog.open? <UserModalDialog modalDialog={props}/> : ""}

                <CreateTable
                    className="user-table"
                    columns={this.state.columns}
                    dataSource={dataSource}
                    pagination={pagination}
                    // scroll={{ x:"101%", y: 600 }}
                    bordered
                />

                {/*<Pagination*/}
                    {/*showSizeChanger={true}*/}
                    {/*showQuickJumper={true}*/}
                    {/*defaultCurrent={3}*/}
                    {/*pageSize={2}*/}
                    {/*pageSizeOptions={[2,4,6,8]}*/}
                    {/*onChange={this.onChange}*/}
                    {/*onShowSizeChange={this.onShowSizeChange}*/}
                    {/*showTotal={this.showTotal}*/}
                    {/*total={props.userList?props.userList.total:""}*/}
                {/*/>*/}

                {/*<Table*/}
                    {/*columns={this.state.columns}*/}
                    {/*dataSource={dataSource}*/}
                    {/*pagination={pagination}*/}
                    {/*bordered*/}
                {/*/>*/}
            </div>
        )
    }


}

export default Form.create({name:"user"})(UserComponent);