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
            <RoleComponent content={role}/>
        )
    }
}

const mapStateToProps = state =>({
    currentPage: state.role.currentPage,
    pageSize: state.role.pageSize,
    roleList: state.role.roleList,
    dialog: state.role.dialog,
    menus: state.role.menus,
    roleInfo: state.role.roleInfo,
    userRoles: state.role.userRoles,

})

const mapDispatchToProps = dispatch =>({
    ...bindActionCreators(actions, dispatch),
    dispatch
})

export default connect(mapStateToProps,mapDispatchToProps)(handleRoleManagement);