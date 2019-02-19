import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./LoginAction";
import LoginComponent from "./LoginComponent";

class handleLogin extends React.Component{

    constructor(props) {
        super(props);
        sessionStorage.setItem("isLogin","0");//未登入
    }

    render(){
        const login = this.props;
        return(
            <LoginComponent login={login}/>
        )
    }
}

const mapStateToProps = state =>({
    userNameDisabled: state.login.userNameDisabled,
    passwordDisabled: state.login.passwordDisabled,
    errorMsg: state.login.errorMsg
})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(handleLogin);