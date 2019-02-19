import React from "react";
// import '../../statics/css/login.css';
import password_icon from "../../statics/images/password_icon.png";
import password_hidden from "../../statics/images/password_hidden.png";
import password_show from "../../statics/images/password_show.png";

let isShow = false;
function toggleImg(){
    isShow = !isShow;
    let isShowPassword = document.getElementById("isShowPassword");
    let userPassword = document.getElementById("userPassword")
    if(isShow){
        isShowPassword.src = password_show;
        userPassword.type = 'text';
    }else{
        isShowPassword.src = password_hidden;
        userPassword.type = 'password';
    }
}

// 输入框获取焦点
function onFocus() {
    document.getElementById('errorMsg').innerHTML = '';
}

// 输入框失去焦点验证value值
function oBlur() {
    // document.getElementById("userName").disabled = 'disabled';
    // document.getElementById("userName").value = 'zj';
    let userName = document.getElementById("userName").value;
    let userPassword = document.getElementById("userPassword").value;
    if( userName===null || userName===undefined || userName==='' ||
        userPassword===null || userPassword===undefined || userPassword===''){
        document.getElementById('errorMsg').innerHTML = '请输入用户名或密码！';
    }else{
        document.getElementById('errorMsg').innerHTML = '';
    }
}

class PassWordField extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const { type, label, password, changePassword, src } = this.props;
        return(
            <div className='field'>
                <span className='password_icon'>
                    <img id='password_icon' src={password_icon}/>
                </span>
                <label className='label'>{label}</label>
                <input id="userPassword" className='input' value={password} onChange={changePassword} placeholder={"请输入"+label} type={type} onFocus={onFocus} onBlur={oBlur} />
                <span className='isShowPassword' onClick={toggleImg}>
                    <img id='isShowPassword' src={password_hidden}/>
                </span>
            </div>
        )
    }

}

export default PassWordField;

