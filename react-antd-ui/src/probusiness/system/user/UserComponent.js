import React from 'react';
import { Table, Divider, Tag } from 'antd';
import Button from "antd/es/button/button";
import CreateTable from '../../../commutils/components/CreateTable';
import '../../../statics/css/system/user/user.css';
import {findDataDict} from "../../../commutils/utils/CommUtils"


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
            {title: '创建人',dataIndex: 'createdBy'},
            {title: '创建时间',dataIndex: 'createdDate'},
            {title: '最后修改人',dataIndex: 'lastModifyBy'},
            {title: '最后修改时间',dataIndex: 'lastModifyDate'},
        ];
        const dataDict = ["USER_TYPE","ACTION"];
        this.state = {
            columns: columns,
            dataDict: dataDict
        }
    }

    componentWillMount() {
        this.props.user.actions.findUserList();
        debugger;
        findDataDict(this.state.dataDict,this.props.user.dispatch);
    }
    // componentDidMount() {
    //     console.log('Component DID MOUNT!')
    // }
    // componentWillReceiveProps(newProps) {
    //     console.log('Component WILL RECEIVE PROPS!')
    // }
    // shouldComponentUpdate(newProps, newState) {
    //     return true;
    // }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log('Component WILL UPDATE!');
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log('Component DID UPDATE!')
    // }
    // componentWillUnmount() {
    //     console.log('Component WILL UNMOUNT!')
    // }

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