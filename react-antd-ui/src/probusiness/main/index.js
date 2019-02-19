import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./MainAction";
import MainConponent from "./MainConponent";


class handleMain extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        const main = this.props;
        return(
            <MainConponent main={main}/>
        )
    }
}

const mapStateToProps = state =>({
    username: state.mainReducer.username,
    userNameDisabled: state.mainReducer.userNameDisabled,
    passwordDisabled: state.mainReducer.passwordDisabled,
    errorMsg: state.mainReducer.errorMsg,
    isTimeOut: state.mainReducer.isTimeOut
})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(handleMain);