import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./UserAction";
import UserComponent from "./UserComponent";

class handleUserManagement extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        const user = this.props;
        return(
            <UserComponent user={user}/>
        )
    }
}

const mapStateToProps = state =>({
    userList: state.user.userList
})

const mapDispatchToProps = dispatch =>{
    return {
        ...bindActionCreators(actions, dispatch),
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(handleUserManagement);