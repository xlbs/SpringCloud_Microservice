import React from 'react';
import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,} from 'antd';
import {DictSelect} from '../../../../commutils/components/utils/Select';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class UserModalDialog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            // modalVisible: true,
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    handleSubmit(e){
        debugger;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    /**
     * 保存用户
     */
    saveUser(){
        debugger;
        this.props.form.validateFields( (err, values) =>{
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        this.props.dialog.closeDialog();
    }

    /**
     * 取消
     */
    cancel(){
        this.props.dialog.closeDialog();
    }

    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword(rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    }

    validateToNextPassword(rule, value, callback){
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange(value){
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

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
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item
                            label="姓名"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    type: 'text', message: 'The input is not valid Text',
                                }, {
                                    required: true, message: '请输入姓名',
                                }],
                            })(
                                <Input placeholder="请输入姓名" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <DictSelect
                                category="USER_TYPE"
                                // defaultValue="1"
                            />
                        </Form.Item>
                        <Form.Item
                            label="账号"
                        >
                            {getFieldDecorator('username', {
                                rules: [{
                                    type: 'text', message: 'The input is not valid Text!',
                                }, {
                                    required: true, message: '请输入账号',
                                }],
                            })(
                                <Input placeholder="请输入账号" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="密码"
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }, {
                                    // validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="确认密码"
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    // validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password"
                                       // onBlur={this.handleConfirmBlur}
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        );
    }
}

export default Form.create()(UserModalDialog);