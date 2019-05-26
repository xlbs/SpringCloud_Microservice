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
            <MenuComponent content={menu}/>
        )
    }
}

const mapStateToProps = state =>({
    currentPage: state.menu.currentPage,
    pageSize: state.menu.pageSize,
    menuList: state.menu.menuList,
    dialog: state.menu.dialog,
    parentMenus: state.menu.parentMenus,
    info: state.menu.info,
})

const mapDispatchToProps = dispatch =>{
    return {
        ...bindActionCreators(actions, dispatch),
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(handleMenuManagement);