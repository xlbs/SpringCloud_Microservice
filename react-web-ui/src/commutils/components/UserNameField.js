import React from "react";
// import '../../statics/css/login.css';
import user_icon from "../../statics/images/user_icon.png";


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

class UserNameField extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const { type, label, userName, changeUserName, input } = this.props;
        return(
            <div className='field'>
                <span className='user_icon'><img id='user_icon' src={user_icon}/></span>
                <label className='label'>{label}</label>
                <input id="userName" className='input' value={userName} onChange={changeUserName} placeholder={"请输入"+label} type={type} onFocus={onFocus} onBlur={oBlur} />
            </div>
        )
    }

}

export default UserNameField;