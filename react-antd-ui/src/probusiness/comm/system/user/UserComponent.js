import React from 'react';
import { Table, Divider } from 'antd';
import Button from "antd/es/button/button";
import CreateTable from '../../../../commutils/components/CreateTable';
import '../../../../statics/css/system/user/user.css';
import {DataDict} from "../../../../commutils/utils/CommUtils"


class UserComponent extends React.Component{

    constructor(props){
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
            {title: '所拥有角色',dataIndex: 'roleNames'},
            {title: '创建人',dataIndex: 'createdByName'},
            {title: '创建时间',dataIndex: 'createdDate'},
            {title: '最后修改人',dataIndex: 'lastModifyByName'},
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

    //导出
    exportUserInfo(){
        this.props.user.exportUserInfo();
    }


    render() {
        const dataSource = this.props.user.userList;
        return (
            <div id="user">
                <Button type="primary" onClick={this.exportUserInfo.bind(this)}>导出</Button>
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