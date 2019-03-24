import React from 'react';
import { Table, Divider } from 'antd';
import Button from "antd/es/button/button";
import CreateTable from '../../../commutils/components/CreateTable';
import '../../../statics/css/system/user/user.css';
import {findDataDict} from "../../../commutils/utils/CommUtils"


class UserComponent extends React.Component{

    constructor(props){
        debugger;
        super(props);
        const columns = [
            {title: '操作',key: 'action',width:150,
                render: ()=>(
                    <span>
                        <Button type="primary" size="small" ghost>编辑</Button>
                        <Divider type="vertical" />
                        <Button type="primary" size="small" ghost>删除</Button>
                    </span>
                )
            },
            {title: '账号',dataIndex: 'username'},
            {title: '姓名',dataIndex: 'name'},
            {title: '类型',dataIndex: 'type'},
            {title: '创建人',dataIndex: 'createdBy'},
            {title: '创建时间',dataIndex: 'createdDate'},
            {title: '最后修改人',dataIndex: 'lastModifyBy'},
            {title: '最后修改时间',dataIndex: 'lastModifyDate'},
        ];
        const dataDict = ["ACTION"];
        this.state = {
            columns: columns,
            dataDict: dataDict
        };
        debugger;
        findDataDict("TESTON",this.props.user.dispatch);
    }

    componentWillMount() {
        this.props.user.findUserList();

    }

    render() {
        const dataSource = this.props.user.userList;
        return (
            <div id="user">
                <Button type="primary">新增</Button>
                <CreateTable
                    columns={this.state.columns}
                    dataSource={dataSource}
                    bordered
                />
                {/*<Table*/}
                    {/*columns={this.state.columns}*/}
                    {/*dataSource={dataSource}*/}
                    {/*bordered*/}
                {/*/>*/}
            </div>
        )
    }


}

export default UserComponent;