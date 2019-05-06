import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./LeaveAction";
import LeaveComponent from "./LeaveComponent";

class handleLeaveProcess extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <LeaveComponent/>
        )
    }
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(handleLeaveProcess);