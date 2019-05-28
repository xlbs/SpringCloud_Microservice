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
    list: state.menu.list,
    currentPage: state.menu.currentPage,
    pageSize: state.menu.pageSize,
    dialog: state.menu.dialog,
    info: state.menu.info,

    parentMenus: state.menu.parentMenus,
})

const mapDispatchToProps = dispatch =>{
    return {
        ...bindActionCreators(actions, dispatch),
        dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(handleMenuManagement);