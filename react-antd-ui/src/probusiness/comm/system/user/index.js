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
            <UserComponent content={user}/>
        )
    }
}

const mapStateToProps = state =>({
    list: state.user.list,
    currentPage: state.user.currentPage,
    pageSize: state.user.pageSize,
    dialog: state.user.dialog,
    info: state.user.info,

    roles: state.user.roles,
    userRoles: state.user.userRoles,
})

const mapDispatchToProps = dispatch =>{
    return {
        ...bindActionCreators(actions, dispatch),
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(handleUserManagement);