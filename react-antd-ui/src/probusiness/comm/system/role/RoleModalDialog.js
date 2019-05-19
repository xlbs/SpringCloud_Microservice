import React from 'react';
import {Modal, Form, Input, Checkbox, Row, Col, Button, Tree} from 'antd';
import {DictSelect} from '../../../../commutils/components/utils/Select';
import {showInfo} from "../../../../commutils/components/dialog/MessageDialog";
import {DataDict} from "../../../../commutils/utils/CommUtils";

const CheckboxGroup = Checkbox.Group;
const { TreeNode } = Tree;

class UserModalDialog extends React.Component {

    constructor(props){
        super(props);
        DataDict("USER_TYPE",props.modalDialog.dispatch);
        this.state = {
            hasFeedback: {
                name: false,
                type: true,
                username: false,
                password: false,
                confirm: false,
            },
            validateStatus: {
                name: '',
                type: 'success',
                username: '',
                password: '',
                confirm: '',
            },
            help: {
                name: '',
                type: '',
                username: '',
                password: '',
                confirm: '',
            },
            confirmDirty: false,
            indeterminate: false,
            checkAll: false,
            checkedList: [],
            buttonDisabled: true,
            clickCheckbox: false,

            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        };

    }

    componentWillMount() {
        this.props.modalDialog.findRoles();
        const content = this.props.modalDialog.dialog.content;
        if(content){
            const userId = content.userId;
            this.setState({
                hasFeedback: {
                    name: true,
                    type: true,
                    username: true,
                    password: true,
                    confirm: true,
                },
                validateStatus: {
                    name: 'success',
                    type: 'success',
                    username: 'success',
                    password: 'success',
                    confirm: 'success',
                },
            });
            this.props.modalDialog.findUserInfo(userId);
        }
    }

    roleCheckbox(){
        const roles = this.props.modalDialog.roles;
        const options = [];
        roles.map(role=>{
            // const option = {label: role.name, value: role.roleId };
            options.push(role.id);
        });
        let userRoles ;
        if(this.props.modalDialog.userInfo){
            userRoles = this.props.modalDialog.userInfo.roles;
        }
        let checkedList = [];
        let indeterminate = false;
        if(userRoles&&this.props.modalDialog.dialog.content&&!this.state.clickCheckbox){
            userRoles.map(userRole =>{
                checkedList.push(userRole.id);
            })
            if(checkedList.length != 0){
                indeterminate = true;
            }else{
                indeterminate = false;
            }
            this.state.checkedList = checkedList;
            this.state.indeterminate = indeterminate;
        }
        return(
            <div id="role">
                <div style={{lineHeight:'39px'}}>
                    <label><span style={{color:'red',marginRight:'4px',fontSize:'14px',fontFamily:'SimSun'}}>*</span>角色:</label>
                </div>
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange.bind(this,options)}
                    checked={this.state.checkAll}
                >
                    全选
                </Checkbox>
                <CheckboxGroup
                    // options={options}
                    value={this.state.checkedList}
                    onChange={this.onChange.bind(this,options)}
                >
                    <Row>
                        {roles.map(role =>{
                            return(
                                <Col span={8}>
                                    <Checkbox value={role.id}>{role.name}</Checkbox>
                                </Col>
                            )
                        })}
                    </Row>
                </CheckboxGroup>
            </div>

        )
    }

    onCheckAllChange(options,e){
        this.setState({
            checkedList: e.target.checked ? options : [],
            indeterminate: false,
            checkAll: e.target.checked,
            clickCheckbox: true,
            buttonDisabled: false || !e.target.checked,
        });
    }

    onChange(options,checkedList){
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < options.length),
            checkAll: checkedList.length === options.length,
            clickCheckbox: true,
            buttonDisabled: false || !checkedList.length,
        });
    }

    validateInputField(field, msg, rule, value, callback){
        const form = this.props.form;
        let hasFeedback = this.state.hasFeedback;
        let validateStatus = this.state.validateStatus;
        let help = this.state.help;
        const fieldValue = form.getFieldValue(field);
        if(!fieldValue){
            hasFeedback[field] = true;
            validateStatus[field] = 'error';
            help[field] = msg;
            this.setState({hasFeedback,validateStatus,help,buttonDisabled:true});
            callback(this.state.help[field]);
        }else{
            if(field=='confirm'){
                if (fieldValue && fieldValue !== form.getFieldValue('password')) {
                    hasFeedback[field] = true;
                    validateStatus[field] = 'error';
                    help[field] = '两次输入的密码不一致';
                    this.setState({hasFeedback,validateStatus,help,buttonDisabled:true});
                    callback(this.state.help[field]);
                } else {
                    hasFeedback[field] = true;
                    validateStatus[field] = 'success';
                    help[field] = '';
                    this.setState({hasFeedback,validateStatus,help,buttonDisabled:false});
                    callback();
                }
            }else{
                hasFeedback[field] = true;
                validateStatus[field] = 'success';
                help[field] = '';
                this.setState({hasFeedback,validateStatus,help,buttonDisabled:false});
                callback();
            }
            if(field=='password' && this.state.confirmDirty){
                form.validateFields(['confirm'], { force: true });
            }
        }
    }

    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    /**
     * 保存用户
     */
    saveUserInfo(){
        this.props.form.validateFieldsAndScroll( (err, values) =>{
            if (!err) {
                debugger;
                const content = this.props.modalDialog.dialog.content;
                if(content){
                    values.id =  content.userId;
                }
                const checkedRoles = this.state.checkedList;
                let roles = [];
                for(let i=0; i<checkedRoles.length; i++){
                    roles.push({id:checkedRoles[i]})
                }
                if(roles.length!=0){
                    values.roles = roles;
                    this.props.modalDialog.saveUserInfo(values);
                }else{
                    showInfo("请为用户分配角色");
                }
            }
        });
    }

    /**
     * 取消
     */
    cancel(){
        this.props.modalDialog.closeDialog();
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
        const { getFieldDecorator } = this.props.form;
        const title = this.props.modalDialog.dialog.title + '用户';
        const userInfo = this.props.modalDialog.userInfo;
        let isEdit = false;
        let {name,type,username} = {};
        if(userInfo&&this.props.modalDialog.dialog.content){
            isEdit = true;
            name = userInfo.name;
            type = userInfo.type;
            username = userInfo.username;
        }

        return (
            <div>
                <Modal
                    title={title}
                    centered
                    visible={true}
                    okText="保存"
                    cancelText="取消"
                    // onOk={this.saveUser.bind(this)}
                    onCancel={this.cancel.bind(this)}//右上角的关闭按钮
                    // okButtonProps={{ disabled: this.state.buttonDisabled }}
                    destroyOnClose={true}
                    footer={[
                        <div className='user-button'>
                            <Button onClick={this.cancel.bind(this)}>
                                取消
                            </Button>
                            <Button type="primary" onClick={this.saveUserInfo.bind(this)} disabled={this.state.buttonDisabled}>
                                保存
                            </Button>
                        </div>
                    ]}
                >
                    {/*<Form>*/}
                        {/*<Form.Item*/}
                            {/*label="姓名"*/}
                            {/*hasFeedback={this.state.hasFeedback.name}*/}
                            {/*validateStatus={this.state.validateStatus.name}*/}
                            {/*help={this.state.help.name}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('name',{*/}
                                {/*rules: [{*/}
                                    {/*required: true,*/}
                                    {/*validator: this.validateInputField.bind(this,'name','Please input your name!'),*/}
                                {/*}],*/}
                                {/*initialValue: name? name : '',*/}
                            {/*})(*/}
                                {/*<Input type='text' placeholder="请输入姓名"/>*/}
                            {/*)}*/}
                        {/*</Form.Item>*/}

                        {/*<Form.Item*/}
                            {/*label="用户类型"*/}
                            {/*hasFeedback={this.state.hasFeedback.type}*/}
                            {/*validateStatus={this.state.validateStatus.type}*/}
                            {/*help={this.state.help.type}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('type',{*/}
                                {/*rules: [{*/}
                                    {/*required: true, message: 'Please select your type!',*/}
                                {/*}],*/}
                                {/*initialValue: type||type==0? type+'' : '2',*/}
                            {/*})(*/}
                                {/*<DictSelect*/}
                                    {/*category="USER_TYPE"*/}
                                    {/*placeholder="请选择用户类型"*/}
                                {/*/>*/}
                            {/*)}*/}
                        {/*</Form.Item>*/}

                        {/*<Form.Item*/}
                            {/*label="账号"*/}
                            {/*hasFeedback={this.state.hasFeedback.username}*/}
                            {/*validateStatus={this.state.validateStatus.username}*/}
                            {/*help={this.state.help.username}*/}
                        {/*>*/}
                            {/*{getFieldDecorator('username',{*/}
                                {/*rules: [{*/}
                                    {/*required: true,*/}
                                    {/*validator: this.validateInputField.bind(this,'username','Please input your username!'),*/}
                                {/*}],*/}
                                {/*initialValue: username? username : '',*/}
                            {/*})(*/}
                                {/*<Input type='text' placeholder="请输入账号"/>*/}
                            {/*)}*/}
                        {/*</Form.Item>*/}
                        {/*{!isEdit?*/}
                            {/*<div>*/}
                                {/*<Form.Item*/}
                                    {/*label="密码"*/}
                                    {/*hasFeedback={this.state.hasFeedback.password}*/}
                                    {/*validateStatus={this.state.validateStatus.password}*/}
                                    {/*help={this.state.help.password}*/}
                                {/*>*/}
                                    {/*{getFieldDecorator('password',{*/}
                                        {/*rules: [{*/}
                                            {/*required: true,*/}
                                            {/*validator: this.validateInputField.bind(this,'password','Please input your password!'),*/}
                                        {/*}],*/}
                                    {/*})(*/}
                                        {/*<Input type='password' placeholder="请输入密码"/>*/}
                                    {/*)}*/}
                                {/*</Form.Item>*/}

                                {/*<Form.Item*/}
                                    {/*label="确认密码"*/}
                                    {/*hasFeedback={this.state.hasFeedback.confirm}*/}
                                    {/*validateStatus={this.state.validateStatus.confirm}*/}
                                    {/*help={this.state.help.confirm}*/}
                                {/*>*/}
                                    {/*{getFieldDecorator('confirm', {*/}
                                        {/*rules: [{*/}
                                            {/*required: true,*/}
                                            {/*validator: this.validateInputField.bind(this,'confirm','Please confirm your password!'),*/}
                                        {/*}],*/}
                                    {/*})(*/}
                                        {/*<Input type='password' placeholder="请确认密码" onBlur={this.handleConfirmBlur.bind(this)}/>*/}

                                    {/*)}*/}
                                {/*</Form.Item>*/}
                            {/*</div>*/}
                            {/*:*/}
                            {/*""*/}
                        {/*}*/}
                    {/*</Form>*/}

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

                    {/*{this.props.modalDialog.roles?this.roleCheckbox.bind(this)():""}*/}

                </Modal>
            </div>
        );
    }
}

export default Form.create()(UserModalDialog);