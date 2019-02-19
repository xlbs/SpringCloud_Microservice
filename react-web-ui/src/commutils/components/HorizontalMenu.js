import React from 'react';
import { Menu, Icon } from 'antd';


class HorizontalMenu extends React.Component{

    render(){
        return(
            <Menu mode="horizontal" theme="dark">
                <Menu.Item key="home"><Icon type="appstore" />首页</Menu.Item>
                <Menu.SubMenu key="system" title={<span><Icon type="setting" />系统管理</span>}>
                    <Menu.Item key="system:1">个人中心</Menu.Item>
                    <Menu.Item key="system:2">修改密码</Menu.Item>
                </Menu.SubMenu>
            </Menu>

        )
    }

}

export default HorizontalMenu;