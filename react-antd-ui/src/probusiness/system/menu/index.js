import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./MenuAction";
import MenuComponent from "./MenuComponent";

class handleMenuManagement extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <MenuComponent/>
        )
    }
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(handleMenuManagement);