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
        const menu = this.props;
        return(
            <MenuComponent menu={menu}/>
        )
    }
}

const mapStateToProps = state =>({
    menuList: state.menu.menuList,
})

const mapDispatchToProps = dispatch =>{
    return {
        ...bindActionCreators(actions, dispatch),
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(handleMenuManagement);