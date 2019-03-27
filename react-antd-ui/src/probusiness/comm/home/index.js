import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions} from "./HomeAction";
import HomeComponent from "./HomeComponent";

class handleHome extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const home = this.props;
        return(
            <HomeComponent home={home} />
        )
    }

}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(handleHome);
