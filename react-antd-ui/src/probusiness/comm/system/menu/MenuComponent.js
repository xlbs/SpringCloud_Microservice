import React from 'react';
import { Form, Table, Divider, Button, Pagination } from 'antd';
import {DataDictPromise, formatDate} from "../../../../commutils/utils/CommUtils";
import MenuModalDialog from "./MenuModalDialog";

class MenuComponent extends React.Component{

    constructor(props){
        super(props);
        const columns = [
            {title:'菜单标识', dataIndex:'id', key:'id', width:100},
            {title:'操作', key:'action', width:150,
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
            {title:'菜单名称', dataIndex:'name', key:'name', width:150},
            // {title:'', key:'number', width:80},
            {title:'菜单等级', dataIndex:'rank', key:'rank', width:100,
                render: (row)=>{
                    if(this.state.menuRank){
                        return this.state.menuRank.map(item => {
                            if(row == item.code){
                                return item.value;
                            }
                        });
                    }
                }
            },
            {title:'URL', dataIndex:'url', key:'url', width:200},
            {title:'是否可用', dataIndex:'isEnable', key:'isEnable', width:100,
                render: (row)=>{
                    if(row){
                        return "是";
                    }else{
                        return "否";
                    }
                }
            },
            {title:'创建人', dataIndex:'createdByName', key:'createdByName', width:150},
            {title:'创建时间', dataIndex:'createdDate', key:'createdDate', width:200,
                render: (row)=>{
                    if(row){
                        return formatDate(row);
                    }
                }
            },
            {title:'最后修改人', dataIndex:'lastModifyByName', key:'lastModifyByName', width:150},
            {title:'最后修改时间', dataIndex:'lastModifyDate', key:'lastModifyDate', width:200,
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
        const category = ["ACTION","MENU_RANK"];
        DataDictPromise(category,this.props.content.dispatch).then(json => {
            this.setState({
                action: json["ACTION"],
                menuRank: json["MENU_RANK"],
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
    remove(id,name){
        this.props.content.remove(id,name);
    }

    handleSubmit(e,values){
        e.preventDefault();
        this.props.content.find();
    }

    render() {
        const props = this.props.content;
        let dataSource,total;
        if(props.list){
            dataSource = props.list.list;
            total = props.list.total;
        }
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
            <div id="menu" className="table-div">
                <Form className="table-form" onSubmit={this.handleSubmit.bind(this)}>

                </Form>

                <div>
                    <Button type="primary" className="primary-button" onClick={this.add.bind(this)}>新增</Button>
                    <Button shape="circle" icon="search" className="search-button" />
                </div>

                <div>
                    <Table
                        className="table"
                        columns={this.state.columns}
                        dataSource={dataSource}
                        pagination={false}
                        scroll={{x:1600,y:587}}
                        defaultExpandAllRows={true}
                        rowSelection={rowSelection}
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

                {props.dialog && props.dialog.open? <MenuModalDialog modalDialog={props}/> : ""}

            </div>
        )
    }
}

export default Form.create()(MenuComponent);