import React from 'react';
import CreateMenu from './CreateMenu'
import RouteConfigFile from '../../../routes/RouteConfigFile'


class VerticalInlineMenu extends React.Component{

    render(){
        return(
            <CreateMenu
                menus={RouteConfigFile.menus}
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