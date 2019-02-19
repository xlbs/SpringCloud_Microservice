import React from "react";

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

class LoginField extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const { className, type, label, value, change, src, toggleImg, eyeIcon, onFocus, oBlur, disabled } = this.props;
        return(
            <div className='field'>
                <span className={className}>
                    <img src={src}/>
                </span>
                <label className='label'>{label}</label>
                {type=='text'?
                    <input className='input' value={value} disabled={disabled} onChange={change} placeholder={"请输入"+label} type='text' onFocus={onFocus} onBlur={oBlur} />
                    :
                    <input className='input' value={value} disabled={disabled} onChange={change} placeholder={"请输入"+label} type='password' onFocus={onFocus} onBlur={oBlur} />
                }
                {toggleImg&&eyeIcon?
                    <span className='isShowPassword' onClick={toggleImg}>
                        <img src={eyeIcon}/>
                    </span>
                    :
                    ''
                }

            </div>
        )
    }

}

export default LoginField;

