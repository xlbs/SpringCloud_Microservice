import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

// 输入框获取焦点
function onFocus() {
    this.props.login.actions.setErrorMsg("");
}

class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            isShow: false
        }
    }

    toggleImg(){
        this.setState({
            isShow: !this.state.isShow
        })
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let user = {
                    username: values.username,
                    password: values.password
                };
                this.props.login.actions.login(user);
            }
        });
    }

    render() {
        const { username, userNameDisabled, passwordDisabled, errorMsg } = this.props.login;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                <p className="error-msg">{errorMsg}</p>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '用户名不能为空!' }],
                        initialValue: username? username : '',
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" disabled={userNameDisabled} onFocus={onFocus.bind(this)}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密码不能为空!' }],
                    })(
                        this.state.isShow ?
                            <Input prefix={<Icon type="unlock" style={{ fontSize: 13 }} onClick={this.toggleImg.bind(this)} />} disabled={passwordDisabled} type="text" placeholder="请输入密码" onFocus={onFocus.bind(this)} />
                            :
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} onClick={this.toggleImg.bind(this)} />} disabled={passwordDisabled} type="password" placeholder="请输入密码" onFocus={onFocus.bind(this)} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                    <a className="login-form-forgot">忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        LOGIN
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(LoginBox);
