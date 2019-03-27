import React from 'react';
import '../../../statics/css/login/login.css';
import LoginBox from "../../../commutils/components/login/LoginBox";

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { login } = this.props;
        return(
            <div id="login" className="login-background">
                <div className="login-frame">
                    <LoginBox login={login}/>
                </div>
                <div className="login-footer">
                    < p > 版权所有：谢李宝生 &nbsp;京ICP备18720968930 &nbsp;微信公众号: xlbs10086 &nbsp;</p>
                </div>
            </div>
        )

    }
}

export default LoginComponent;
