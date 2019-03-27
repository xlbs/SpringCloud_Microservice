import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./MainAction";
import MainComponent from "./MainComponent";


class handleMain extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        const main = this.props;
        return(
            <MainComponent main={main}/>
        )
    }
}

const mapStateToProps = state =>({
    username: state.main.username,
    userNameDisabled: state.main.userNameDisabled,
    passwordDisabled: state.main.passwordDisabled,
    errorMsg: state.main.errorMsg,
    isTimeOut: state.main.isTimeOut
})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(handleMain);