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
    list: state.role.list,
    currentPage: state.role.currentPage,
    pageSize: state.role.pageSize,
    dialog: state.role.dialog,
    info: state.role.info,

    menus: state.role.menus,
})

const mapDispatchToProps = dispatch =>({
    ...bindActionCreators(actions, dispatch),
    dispatch
})

export default connect(mapStateToProps,mapDispatchToProps)(handleRoleManagement);