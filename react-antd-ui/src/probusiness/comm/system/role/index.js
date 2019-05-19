import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./RoleAction";
import RoleComponent from "./RoleComponent";

class handleRoleManagement extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        const role = this.props;
        return(
            <RoleComponent role={role}/>
        )
    }
}

const mapStateToProps = state =>({
    currentPage: state.role.currentPage,
    pageSize: state.role.pageSize,
    dialog: state.role.dialog,
    userList: state.role.userList,
    roles: state.role.roles,
    userInfo: state.role.userInfo,
    userRoles: state.role.userRoles,

})

const mapDispatchToProps = dispatch =>({
    ...bindActionCreators(actions, dispatch),
    dispatch
})

export default connect(mapStateToProps,mapDispatchToProps)(handleRoleManagement);