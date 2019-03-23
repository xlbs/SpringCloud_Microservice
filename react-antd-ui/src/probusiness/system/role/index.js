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
        return(
            <RoleComponent/>
        )
    }
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(handleRoleManagement);