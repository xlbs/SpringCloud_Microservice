import React from 'react';
import CreateMenu from './CreateMenu'
import {CurrentCache} from "../../utils/CurrentCache";


class VerticalInlineMenu extends React.Component{

    render(){
        const menu = CurrentCache.get().menu;
        return(
            <CreateMenu
                menus={menu}
                mode="inline"
                theme="dark"
                style={{ height: '100%' }}
                // onClick={this.menuClick}
                // selectedKeys={[this.state.selectedKey]}
                // openKeys={this.state.firstHide ? null : [this.state.openKey]}
                // onOpenChange={this.openMenu}
            />
        )
    }

}

export default VerticalInlineMenu;