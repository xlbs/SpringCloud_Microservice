import React from 'react'
import LoginField from "./LoginField";
import password_icon from "../../../statics/images/password_icon.png";
import user_icon from "../../../statics/images/user_icon.png";
import password_hidden from "../../../statics/images/password_hidden.png";
import password_show from "../../../statics/images/password_show.png";

// 输入框获取焦点
function onFocus() {
    this.props.login.actions.setErrorMsg("");
}

// 输入框失去焦点验证value值
function oBlur(userName, password) {
    if( userName===null || userName===undefined || userName==='' ||
        password===null || password===undefined || password===''){
        this.props.login.actions.setErrorMsg("请输入用户名或密码");
    }else{
        this.props.login.actions.setErrorMsg("");
    }
}

//是否显示密码
let isShow = false;
function toggleImg(){
    isShow = !isShow;
    if(isShow){
        this.setState({
            passwordType: 'text',
            eyeIcon: password_show
        })
    }else{
        this.setState({
            passwordType: 'password',
            eyeIcon: password_hidden
        })
    }
}

class LoginBox extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            passwordType: 'password',
            eyeIcon: password_hidden

        }
    }

    loginSubmit(userName,password){
        if( userName===null || userName===undefined || userName==='' ||
            password===null || password===undefined || password===''){
            this.props.actions.setErrorMsg("请输入用户名或密码");
            return;
        }
        let user = {
            userName: userName,
            password: password
        };
        this.props.login.actions.login(user);
    }

    changeUserName(e) {
        this.props.login.actions.setUserName(e.target.value);
    }

    changePassword(e) {
        this.props.login.actions.setPassword(e.target.value);
    }



    render(){
        const { login } = this.props;
        return(
            <div>
                <div>
                    <p className='errorMsg'>{login.errorMsg}</p>
                </div>
                <LoginField
                    className='user_icon'
                    type="text"
                    label="用户名"
                    value={login.userName}
                    change={this.changeUserName.bind(this)}
                    src={user_icon}
                    onFocus={onFocus.bind(this)}
                    oBlur={oBlur.bind(this, login.userName,login.password)}
                    disabled={login.userNameDisabled}
                />
                <LoginField
                    className='password_icon'
                    type={this.state.passwordType}
                    label="密码"
                    value={login.password}
                    change={this.changePassword.bind(this)}
                    src={password_icon}
                    onFocus={onFocus.bind(this)}
                    oBlur={oBlur.bind(this, login.userName,login.password)}
                    toggleImg={toggleImg.bind(this)}
                    eyeIcon={this.state.eyeIcon}
                    disabled={login.passwordDisabled}
                />
                <button
                    type="button"
                    className='loginButton'
                    onClick={this.loginSubmit.bind(this, login.userName, login.password)}
                >
                    LOGIN
                </button>
            </div>
        )
    }
}

export default LoginBox;