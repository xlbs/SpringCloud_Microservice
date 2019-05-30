import React from 'react';
import '../../../../statics/css/system/user/user.css';
import { Form, Button, Table, Divider, Pagination } from 'antd';
import {DataDictPromise,formatDate} from "../../../../commutils/utils/CommUtils"
import UserModalDialog from "./UserModalDialog";

class UserComponent extends React.Component{

    constructor(props){
        super(props);
        const columns = [
            {title: '操作',key: 'action',width:150,
                render: (row)=>{
                    return(
                        <span>
                            <Button type="primary" size="small" onClick={this.edit.bind(this,row.id)} ghost>编辑</Button>
                            <Divider type="vertical" />
                            <Button type="primary" size="small" onClick={this.remove.bind(this,row.id,row.username,row.name)} ghost>删除</Button>
                        </span>
                    )
                }
            },
            {title: '账号',dataIndex: 'username',key: 'username',width:200},
            {title: '姓名',dataIndex: 'name',key: 'name',width:150},
            {title: '类型',dataIndex: 'type',key: 'type',width:100,
                render: (row)=>{
                    if(this.state.userType){
                        return this.state.userType.map(item => {
                            if(row == item.code){
                                return item.value;
                            }
                        });
                    }
                }
            },
            {title: '所拥有角色',dataIndex: 'roleName',key: 'roleName',width:200},
            {title: '创建人',dataIndex: 'createdByName',key: 'createdByName',width:150},
            {title: '创建时间',dataIndex: 'createdDate',key: 'createdDate',width:200,
                render: (row)=>{
                    if(row){
                        return formatDate(row);
                    }
                }
            },
            {title: '最后修改人',dataIndex: 'lastModifyByName',key: 'lastModifyByName',width:150},
            {title: '最后修改时间',dataIndex: 'lastModifyDate',key: 'lastModifyDate',width:200,
                render: (row)=>{
                    if(row){
                        return formatDate(row);
                    }
                }
            },
        ];
        this.state = {
            columns: columns,
        };
        this.onChange = this.onChange.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    componentWillMount() {
        DataDictPromise("USER_TYPE",this.props.content.dispatch).then((json)=>{
            this.setState({
                userType: json["USER_TYPE"],
            });
        });
        this.props.content.find();
    }

    onChange(page, pageSize){
        this.props.content.setCurrentPage(page);
        this.props.content.setPageSize(pageSize);
        this.props.content.find();
    }
    onShowSizeChange(current, size){
        this.props.content.setCurrentPage(current);
        this.props.content.setPageSize(size);
        this.props.content.find();
    }
    showTotal(total, range){
        return `${range[0]}-${range[1]} of ${total}`;
    }

    //新增
    add(){
        this.props.content.add();
    }
    //编辑
    edit(id){
        this.props.content.edit(id);
    }
    //删除
    remove(id,username,name){
        this.props.content.remove(id,username,name);
    }
    //导出
    outPut(){
        this.props.content.outPut();
    }


    handleSubmit(e,values){
        e.preventDefault();
        this.props.content.find();

    }


    render() {
        const props = this.props.content;
        // const pagination ={
        //     showSizeChanger: true,
        //     showQuickJumper: true,
        //     pageSize: props.pageSize,
        //     defaultCurrent: props.currentPage,
        //     pageSizeOptions:["10","20","30","50"],
        //     onChange: this.onChange,
        //     onShowSizeChange: this.onShowSizeChange,
        //     showTotal: this.showTotal,
        // };
        let dataSource,total;
        if(props.list){
            dataSource = props.list.list;
            total = props.list.total;
            // pagination.total = props.list.total;
        }

        return (
            <div id="user" className="table-div">
                <Form className="table-form" onSubmit={this.handleSubmit.bind(this)}>

                </Form>

                <div>
                    <Button type="primary" className="primary-button" onClick={this.add.bind(this)}>新增</Button>
                    <Button type="primary" className="primary-button" onClick={this.outPut.bind(this)}>导出</Button>
                    <Button shape="circle" icon="search" className="search-button" />
                </div>

                <div>
                    {/*<CreateTable*/}
                        {/*className="table"*/}
                        {/*columns={this.state.columns}*/}
                        {/*dataSource={dataSource}*/}
                        {/*format={{type:"DATA_DICT.USER_TYPE",createdDate:"DATE",lastModifyDate:"DATE"}}*/}
                        {/*// pagination={pagination}*/}
                        {/*pagination={false}*/}
                        {/*scroll={{x:1500,y:587}}*/}
                        {/*bordered*/}
                    {/*/>*/}

                    <Table
                        className="table"
                        columns={this.state.columns}
                        dataSource={dataSource}
                        pagination={false}
                        scroll={{x:1500,y:587}}
                        bordered
                    />

                    <Pagination
                        className="pagination"
                        showSizeChanger={true}
                        showQuickJumper={true}
                        pageSize={props.pageSize}
                        defaultCurrent={props.currentPage}
                        pageSizeOptions={["10","20","30","50"]}
                        onChange={this.onChange}
                        onShowSizeChange={this.onShowSizeChange}
                        showTotal={this.showTotal}
                        total={total?total:0}
                    />
                </div>

                {props.dialog && props.dialog.open? <UserModalDialog modalDialog={props}/> : ""}

            </div>

        )
    }


}

export default Form.create({name:"user"})(UserComponent);