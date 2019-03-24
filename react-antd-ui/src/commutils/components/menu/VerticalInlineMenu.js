import React from 'react';
import CreateMenu from './CreateMenu'
import {CurrentSessionCache} from "../../utils/CurrentCache";


class VerticalInlineMenu extends React.Component{

    render(){
        const menu = CurrentSessionCache.get("MENU");
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