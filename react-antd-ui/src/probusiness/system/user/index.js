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
        return(
            <UserComponent/>
        )
    }
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(handleUserManagement);