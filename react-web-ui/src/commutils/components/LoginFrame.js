import React from 'react';
import user_icon from '../../statics/images/user_icon.png'
import password_icon from '../../statics/images/password_icon.png'
import password_hidden from '../../statics/images/password_hidden.png'
import password_show from '../../statics/images/password_show.png'

const style = {
    field: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '56px',
        padding: '12px',
        position: 'relative'

    },
    input: {
        width: '20em',
        height: '32px',
        lineHeight: '32px',
        textIndent: '18px',
        fontSize: '16px',
        padding: '2px 12px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    label: {
        fontSize: '18px',
        color: '#00b2f9',
        position: 'absolute',
        top: '3px',
        left: '37px',
        background: '#fff'
    },
    error: {
        paddingTop: '40px',
        margin: '0px',
        height: '16px',
        fontSize: '16px',
        fontWeight: '700',
        color: '#f00',
        textAlign: 'center'
    },
    user_icon: {
        position: 'absolute',
        left: '28px',
        cursor: 'pointer',
        display: 'inline-flex',
        width: '20px',
        height: '20px',
        padding: '6px',
        flexDirection: 'column',
        borderRadius: '50%',
        top: '22px'
    },
    password_icon: {
        position: 'absolute',
        left: '28px',
        cursor: 'pointer',
        display: 'inline-flex',
        width: '20px',
        height: '20px',
        padding: '6px',
        flexDirection: 'column',
        borderRadius: '50%',
        top: '22px'
    },
    isShowPassword: {
        position: 'absolute',
        right: '30px',
        cursor: 'pointer',
        display: 'inline-flex',
        width: '20px',
        height: '20px',
        padding: '8px',
        flexDirection: 'column',
        borderRadius: '50%',
        top: '22px'
    }

}

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
    let userName = document.getElementById("userName").value;
    let userPassword = document.getElementById("userPassword").value;
    if( userName===null || userName===undefined || userName==='' ||
        userPassword===null || userPassword===undefined || userPassword===''){
        document.getElementById('errorMsg').innerHTML = '请输入用户名或密码！';
    }else{
        document.getElementById('errorMsg').innerHTML = '';
    }
}

export const UserNameField = ({ input, label, type }) => (
    <div style={style.field}>
        <span style={style.user_icon}><img id='user_icon' src={user_icon}/></span>
        <label style={style.label}>{label}</label>
        <input id="userName" style={style.input} {...input} placeholder={"请输入"+label} type={type} onFocus={onFocus} onBlur={oBlur} />
    </div>
);

export const PassWordField = ({ input, label, type }) => (
    <div style={style.field}>
        <span style={style.password_icon}><img id='password_icon' src={password_icon}/></span>
        <label style={style.label}>{label}</label>
        <input id="userPassword" style={style.input} {...input} placeholder={"请输入"+label} type={type} onFocus={onFocus} onBlur={oBlur} />
        <span style={style.isShowPassword} onClick={toggleImg}><img id='isShowPassword' src={password_hidden}/></span>
    </div>
);

export const ErrorMsgField = ({ meta: { touched, error } }) => (
    <div>
        <p id="errorMsg" style={style.error}>{error}</p>
    </div>
);