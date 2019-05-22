import React from 'react';
import {Form, Button, Divider, Pagination} from 'antd';
import CreateTable from '../../../../commutils/components/utils/CreateTable';
import '../../../../statics/css/system/menu/menu.css';
import RoleModalDialog from "./RoleModalDialog";


class RoleComponent extends React.Component{

    constructor(props){
        super(props);
        const columns = [
            {title: '操作',key: 'action',width:150,
                render: (row)=>{
                    return(
                        <span>
                            <Button type="primary" size="small" onClick={this.edit.bind(this,row.id)} ghost>编辑</Button>
                            <Divider type="vertical" />
                            <Button type="primary" size="small" onClick={this.remove.bind(this,row.id,row.name)} ghost>删除</Button>
                        </span>
                    )
                }
            },
            {title: '角色',dataIndex: 'name',key: 'name',width:200},
            {title: '所拥有菜单',dataIndex: 'menuName',key: 'roleName',width:250},
            {title: '创建人',dataIndex: 'createdByName',key: 'createdByName',width:150},
            {title: '创建时间',dataIndex: 'createdDate',key: 'createdDate',width:200},
            {title: '最后修改人',dataIndex: 'lastModifyByName',key: 'lastModifyByName',width:150},
            {title: '最后修改时间',dataIndex: 'lastModifyDate',key: 'lastModifyDate',width:200},
        ];
        this.state = {
            columns: columns,
        };
        this.onChange = this.onChange.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    componentWillMount() {
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

    handleSubmit(e,values){
        e.preventDefault();
        this.props.content.find();

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
    remove(id,name){
        this.props.content.remove(id,name);
    }

    //导出
    export(){
        this.props.content.exportUserInfo();
    }


    render() {
        const props = this.props.content;
        let dataSource;
        if(props.roleList){
            dataSource = props.roleList.list;
        }


        return (
            <div id="user" className="user">
                <Form className="user-form" onSubmit={this.handleSubmit.bind(this)}>

                </Form>

                <div>
                    <Button type="primary" className="primary-button" onClick={this.add.bind(this)}>新增</Button>
                    <Button type="primary" className="primary-button" onClick={this.export.bind(this)}>导出</Button>
                    <Button shape="circle" icon="search" className="search-button" />
                </div>

                <div>
                    <CreateTable
                        className="user-table"
                        columns={this.state.columns}
                        dataSource={dataSource}
                        format={{createdDate:"DATE",lastModifyDate:"DATE"}}
                        pagination={false}
                        scroll={{x:1300,y:587}}
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
                        total={props.roleList?props.roleList.total:0}
                    />
                </div>

                {props.dialog && props.dialog.open? <RoleModalDialog modalDialog={props}/> : ""}

            </div>

        )
    }
}

export default RoleComponent;