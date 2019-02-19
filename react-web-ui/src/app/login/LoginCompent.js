import React from "react";
import '../../statics/css/login.css';
import LoginBox from "../../commutils/components/login/LoginBox";

class LoginCompent extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const login = this.props;
        return(
            <div className='loginBackground'>
                <div className='loginFrame'>
                    <LoginBox login={login}/>
                </div>
                <div className='loginFooter'>
                    < p > 版权所有：谢李宝生 &nbsp;京ICP备18720968930 &nbsp;微信公众号: xlbs10086 &nbsp;</p>
                </div>
            </div>
        )
    }
}

export default LoginCompent;