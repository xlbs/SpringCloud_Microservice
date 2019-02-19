import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./PersonCenterAction";
import PersonCenterComponent from "./PersonCenterComponent";

class handlePersonCenter extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        const personCenter = this.props;
        return(
            <PersonCenterComponent personCenter={personCenter}/>
        )
    }
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(handlePersonCenter);