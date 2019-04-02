import React from 'react';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,} from 'antd';
import {DictSelect} from '../../../../commutils/components/utils/Select';

class UserModalDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hasFeedback: {
                name: false,
                userType: true,
                username: false,
                password: false,
                confirm: false,
            },
            validateStatus: {
                name: '',
                userType: 'success',
                username: '',
                password: '',
                confirm: '',
            },
            help: {
                name: '',
                userType: '',
                username: '',
                password: '',
                confirm: '',
            },
            confirmDirty: false,
        };
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
            this.setState({hasFeedback,validateStatus,help});
        }else{
            if(field=='confirm'){
                if (fieldValue && fieldValue !== form.getFieldValue('password')) {
                    hasFeedback[field] = true;
                    validateStatus[field] = 'error';
                    help[field] = '两次输入的密码不一致';
                    this.setState({hasFeedback,validateStatus,help});
                } else {
                    hasFeedback[field] = true;
                    validateStatus[field] = 'success';
                    help[field] = '';
                    this.setState({hasFeedback,validateStatus,help});
                }
            }else{
                hasFeedback[field] = true;
                validateStatus[field] = 'success';
                help[field] = '';
                this.setState({hasFeedback,validateStatus,help});
            }
            if(field=='password' && this.state.confirmDirty){
                form.validateFields(['confirm']);
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
    saveUser(){
        debugger;
        this.props.form.validateFieldsAndScroll( (err, values) =>{
            if (!err) {
                this.props.dialog.saveUser(values);
                console.log('Received values of form: ', values);
            }
        });
    }

    /**
     * 取消
     */
    cancel(){
        this.props.dialog.closeDialog();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="新增用户"
                    centered
                    visible={true}
                    okText="保存"
                    cancelText="取消"
                    onOk={this.saveUser.bind(this)}
                    onCancel={this.cancel.bind(this)}
                    destroyOnClose={true}
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
                                    validator: this.validateInputField.bind(this,'name','Please input your name!'),
                                }],
                            })(
                                <Input type='text' placeholder="请输入姓名"/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="用户类型"
                            hasFeedback={this.state.hasFeedback.userType}
                            validateStatus={this.state.validateStatus.userType}
                            help={this.state.help.userType}
                        >
                            {getFieldDecorator('userType',{
                                rules: [{
                                    required: true, message: 'Please select your userType!',
                                }],
                                initialValue: '2',
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
                                    validator: this.validateInputField.bind(this,'username','Please input your username!'),
                                }],
                            })(
                                <Input type='text' placeholder="请输入账号"/>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            hasFeedback={this.state.hasFeedback.password}
                            validateStatus={this.state.validateStatus.password}
                            help={this.state.help.password}
                        >
                            {getFieldDecorator('password',{
                                rules: [{
                                    required: true,
                                    validator: this.validateInputField.bind(this,'password','Please input your password!'),
                                }],
                            })(
                                <Input type="password" placeholder="请输入密码"/>
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
                                    validator: this.validateInputField.bind(this,'confirm','Please confirm your password!'),
                                }],
                            })(
                                <Input type="password" placeholder="请确认密码" onBlur={this.handleConfirmBlur.bind(this)}/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        );
    }
}

export default Form.create()(UserModalDialog);