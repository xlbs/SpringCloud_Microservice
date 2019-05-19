import React from 'react';
import {Form, Button, Divider, Pagination, Tree} from 'antd';
import CreateTable from '../../../../commutils/components/CreateTable';
import '../../../../statics/css/system/user/user.css';
import {DataDict} from "../../../../commutils/utils/CommUtils"
import RoleModalDialog from "./RoleModalDialog";

const { TreeNode } = Tree;

class RoleComponent extends React.Component{

    constructor(props){
        super(props);
        const columns = [
            {title: '操作',key: 'action',width:150,
                render: (row)=>{
                    return(
                        <span>
                            <Button type="primary" size="small" onClick={this.editRole.bind(this,row.id)} ghost>编辑</Button>
                            <Divider type="vertical" />
                            <Button type="primary" size="small" onClick={this.deleteRole.bind(this,row.id,row.username)} ghost>删除</Button>
                        </span>
                    )
                }
            },
            {title: '角色',dataIndex: 'name',key: 'name',width:200},
            {title: '所拥有菜单',dataIndex: 'menuName',key: 'roleName',width:200},
            {title: '创建人',dataIndex: 'createdByName',key: 'createdByName',width:150},
            {title: '创建时间',dataIndex: 'createdDate',key: 'createdDate',width:200},
            {title: '最后修改人',dataIndex: 'lastModifyByName',key: 'lastModifyByName',width:150},
            {title: '最后修改时间',dataIndex: 'lastModifyDate',key: 'lastModifyDate',width:200},
        ];
        this.state = {
            columns: columns,

            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        };
        DataDict("USER_TYPE",this.props.role.dispatch);
        this.onChange = this.onChange.bind(this);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    componentWillMount() {
        this.props.role.findUserList();
    }

    onChange(page, pageSize){
        this.props.role.setCurrentPage(page);
        this.props.role.setPageSize(pageSize);
        this.props.role.findUserList();
    }

    onShowSizeChange(current, size){
        this.props.role.setCurrentPage(current);
        this.props.role.setPageSize(size);
        this.props.role.findUserList();
    }

    showTotal(total, range){
        return `${range[0]}-${range[1]} of ${total}`;
    }

    handleSubmit(e,values){
        e.preventDefault();
        this.props.role.findUserList();

    }

    //新增
    addRole(){
        this.props.role.addUser();
    }

    //编辑
    editRole(userId){
        this.props.role.editUser(userId);
    }

    //删除
    deleteRole(userId,username){
        this.props.role.deleteUser(userId,username);
    }

    //导出
    exportRoleInfo(){
        this.props.role.exportUserInfo();
    }

    onExpand(expandedKeys) {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck(checkedKeys){
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    onSelect(selectedKeys, info){
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };

    renderTreeNodes(data){
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        })
    }

    render() {
        const props = this.props.role;
        const pagination ={
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: props.pageSize,
            defaultCurrent: props.currentPage,
            pageSizeOptions:["10","20","30","50"],
            onChange: this.onChange,
            onShowSizeChange: this.onShowSizeChange,
            showTotal: this.showTotal,
        };
        let dataSource;
        if(props.userList){
            dataSource = props.userList.list;
            pagination.total = props.userList.total;
        }

        const treeData = [
            {
                title: '0-0',
                key: '0-0',
                children: [
                    {
                        title: '0-0-0',
                        key: '0-0-0',
                        children: [
                            { title: '0-0-0-0', key: '0-0-0-0' },
                            { title: '0-0-0-1', key: '0-0-0-1' },
                            { title: '0-0-0-2', key: '0-0-0-2' },
                        ],
                    },
                    {
                        title: '0-0-1',
                        key: '0-0-1',
                        children: [
                            { title: '0-0-1-0', key: '0-0-1-0' },
                            { title: '0-0-1-1', key: '0-0-1-1' },
                            { title: '0-0-1-2', key: '0-0-1-2' },
                        ],
                    },
                    {
                        title: '0-0-2',
                        key: '0-0-2',
                    },
                ],
            },
            {
                title: '0-1',
                key: '0-1',
                children: [
                    { title: '0-1-0-0', key: '0-1-0-0' },
                    { title: '0-1-0-1', key: '0-1-0-1' },
                    { title: '0-1-0-2', key: '0-1-0-2' },
                ],
            },
            {
                title: '0-2',
                key: '0-2',
            },
        ];

        return (
            <div id="user" className="user">
                <Form className="user-form" onSubmit={this.handleSubmit.bind(this)}>

                </Form>

                <div>
                    <Button type="primary" className="primary-button" onClick={this.addRole.bind(this)}>新增</Button>
                    <Button type="primary" className="primary-button" onClick={this.exportRoleInfo.bind(this)}>导出</Button>
                    <Button shape="circle" icon="search" className="search-button" />
                </div>

                <div>
                    <CreateTable
                        className="user-table"
                        columns={this.state.columns}
                        dataSource={dataSource}
                        format={{type:"DATA_DICT.USER_TYPE",createdDate:"DATE",lastModifyDate:"DATE"}}
                        // pagination={pagination}
                        pagination={false}
                        scroll={{x:1600,y:587}}
                        bordered
                    />
                    <Pagination
                        className="user-pagination"
                        showSizeChanger={true}
                        showQuickJumper={true}
                        pageSize={props.pageSize}
                        defaultCurrent={props.currentPage}
                        pageSizeOptions={["10","20","30","50"]}
                        onChange={this.onChange}
                        onShowSizeChange={this.onShowSizeChange}
                        showTotal={this.showTotal}
                        total={props.userList?props.userList.total:0}
                    />
                </div>

                <Tree
                    checkable
                    onExpand={this.onExpand.bind(this)}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck.bind(this)}
                    checkedKeys={this.state.checkedKeys}
                    onSelect={this.onSelect.bind(this)}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderTreeNodes(treeData)}
                </Tree>

                {props.dialog && props.dialog.open? <RoleModalDialog modalDialog={props}/> : ""}

            </div>

        )
    }
}

export default RoleComponent;