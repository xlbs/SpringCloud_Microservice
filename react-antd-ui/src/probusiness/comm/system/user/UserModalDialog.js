import React from 'react';
import {Modal, Form, Input, Checkbox, Row, Col, Button,} from 'antd';
import {DictSelect} from '../../../../commutils/components/utils/Select';
import {showInfo} from "../../../../commutils/components/dialog/MessageDialog";

const CheckboxGroup = Checkbox.Group;

class UserModalDialog extends React.Component {

    constructor(props){
        super(props);
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
        };

    }

    componentWillMount() {
        this.props.modalDialog.findAllRole();
        const content = this.props.modalDialog.dialog.content;
        if(content){
            const id = content.id;
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
            this.props.modalDialog.findById(id);
        }
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

    roleCheckbox(){
        const roles = this.props.modalDialog.roles;
        const options = [];
        roles.map(role=>{
            // const option = {label: role.name, value: role.roleId };
            options.push(role.id);
        });
        let userRoles ;
        if(this.props.modalDialog.info){
            userRoles = this.props.modalDialog.info.roles;
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
                {roles.length!=0?
                    <div id="checkbox">
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
                    :
                    <div className="role-div-text">您还未创建角色，请先在角色管理中创建角色</div>
                }
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
    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    cancel(){
        this.props.modalDialog.closeDialog();
    }

    save(){
        this.props.form.validateFieldsAndScroll( (err, values) =>{
            if (!err) {
                const content = this.props.modalDialog.dialog.content;
                if(content){
                    values.id =  content.id;
                }
                const checkedRoles = this.state.checkedList;
                let roles = [];
                for(let i=0; i<checkedRoles.length; i++){
                    roles.push({id: checkedRoles[i]})
                }
                if(roles.length!=0){
                    values.roles = roles;
                    this.props.modalDialog.save(values);
                }else{
                    showInfo("请为用户分配角色");
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const title = this.props.modalDialog.dialog.title + '用户';
        const info = this.props.modalDialog.info;
        let isEdit = false;
        let {name,type,username} = {};
        if(info&&this.props.modalDialog.dialog.content){
            isEdit = true;
            name = info.name;
            type = info.type;
            username = info.username;
        }

        return (
            <div>
                <Modal
                    title={title}
                    centered={true}
                    maskClosable={false}
                    visible={true}
                    okText="保存"
                    cancelText="取消"
                    // onOk={this.saveUser.bind(this)}
                    onCancel={this.cancel.bind(this)}//右上角的关闭按钮
                    // okButtonProps={{ disabled: this.state.buttonDisabled }}
                    destroyOnClose={true}
                    footer={[
                        <div className='modal-button'>
                            <Button onClick={this.cancel.bind(this)}>
                                取消
                            </Button>
                            <Button type="primary" onClick={this.save.bind(this)} disabled={this.state.buttonDisabled}>
                                保存
                            </Button>
                        </div>
                    ]}
                >
                    <Form>
                        <Form.Item
                            label="姓名"
                            hasFeedback={this.state.hasFeedback.name}
                            validateStatus={this.state.validateStatus.name}
                            help={this.state.help.name}
                        >
                            {getFieldDecorator('name',{
                                rules: [{
                                    required: true,
                                    validator: this.validateInputField.bind(this,'name','请输入姓名！'),
                                }],
                                initialValue: name? name : '',
                            })(
                                <Input type='text' placeholder="请输入姓名"/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="用户类型"
                            hasFeedback={this.state.hasFeedback.type}
                            validateStatus={this.state.validateStatus.type}
                            help={this.state.help.type}
                        >
                            {getFieldDecorator('type',{
                                rules: [{
                                    required: true,
                                    validator: this.validateInputField.bind(this,'type','请选择用户类型！'),
                                }],
                                initialValue: type||type==0? type+'' : '2',
                            })(
                                <DictSelect
                                    category="USER_TYPE"
                                    placeholder="请选择用户类型"
                                />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="账号"
                            hasFeedback={this.state.hasFeedback.username}
                            validateStatus={this.state.validateStatus.username}
                            help={this.state.help.username}
                        >
                            {getFieldDecorator('username',{
                                rules: [{
                                    required: true,
                                    validator: this.validateInputField.bind(this,'username','请输入账号！'),
                                }],
                                initialValue: username? username : '',
                            })(
                                <Input type='text' placeholder="请输入账号"/>
                            )}
                        </Form.Item>
                        {!isEdit?
                            <div>
                                <Form.Item
                                    label="密码"
                                    hasFeedback={this.state.hasFeedback.password}
                                    validateStatus={this.state.validateStatus.password}
                                    help={this.state.help.password}
                                >
                                    {getFieldDecorator('password',{
                                        rules: [{
                                            required: true,
                                            validator: this.validateInputField.bind(this,'password','请输入密码！'),
                                        }],
                                    })(
                                        <Input type='password' placeholder="请输入密码"/>
                                    )}
                                </Form.Item>

                                <Form.Item
                                    label="确认密码"
                                    hasFeedback={this.state.hasFeedback.confirm}
                                    validateStatus={this.state.validateStatus.confirm}
                                    help={this.state.help.confirm}
                                >
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true,
                                            validator: this.validateInputField.bind(this,'confirm','请确认密码！'),
                                        }],
                                    })(
                                        <Input type='password' placeholder="请确认密码" onBlur={this.handleConfirmBlur.bind(this)}/>

                                    )}
                                </Form.Item>
                            </div>
                            :
                            ""
                        }
                    </Form>

                    {this.props.modalDialog.roles?this.roleCheckbox.bind(this)():""}

                </Modal>
            </div>
        );
    }
}

export default Form.create()(UserModalDialog);