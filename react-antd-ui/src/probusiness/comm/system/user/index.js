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
    currentPage: state.user.currentPage,
    pageSize: state.user.pageSize,
    dialog: state.user.dialog,
    userList: state.user.userList,
    roles: state.user.roles,
    userInfo: state.user.userInfo,
    userRoles: state.user.userRoles,
})

const mapDispatchToProps = dispatch =>{
    return {
        ...bindActionCreators(actions, dispatch),
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(handleUserManagement);