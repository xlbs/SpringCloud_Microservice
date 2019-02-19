import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {ErrorMsgField} from "./LoginFrame";
import UserNameField from './UserNameField';
import PassWordField from './PassWordField';

class LoginFormComponent extends React.Component {
    constructor(props){
        super(props);
        // this.changePassword = this.changePassword.bind(this);
        // this.changeUserName = this.changeUserName.bind(this);
        this.state = {
            userName:'',
            password: ''
        }
    }

    // changeUserName(e) {
    //     this.setState({
    //         userName:e.target.value
    //     })
    // }
    //
    // changePassword(e) {
    //     this.setState({
    //         password: e.target.value
    //     })
    // }

    render(){
        const { userName, password, changeUserName, changePassword } = this.props;
        return (
            <form>
                <Field
                    name="errorMsg"
                    component={ErrorMsgField}
                />
                <Field
                    name="userNo"
                    type="text"
                    component={UserNameField}
                    label="用户名"
                    userName={userName}
                    changeUserName={changeUserName}
                />
                <Field
                    name="password"
                    type="password"
                    component={PassWordField}
                    label="密码"
                    password={password}
                    changePassword={changePassword}
                />
            </form>
        );
    }

}

export default reduxForm({
    form: 'loginForm', // 此表单的唯一标识符
})(LoginFormComponent);