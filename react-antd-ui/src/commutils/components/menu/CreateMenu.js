import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem = item => ( // item.route 菜单单独跳转的路由
    <Menu.Item key={item.key}>
        <Link to={item.route || item.key}>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.title}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = subItem => (
    <Menu.SubMenu
        key={subItem.key}
        title={
            <span>
                {subItem.icon && <Icon type={subItem.icon} />}
                <span className="nav-text">{subItem.title}</span>
            </span>
        }
    >
        {subItem.subs.map( item => {
            return(
                <Menu.Item key={subItem.key+item.key}>
                    <Link to={subItem.key+item.key}>
                        {item.icon && <Icon type={item.icon} />}
                        <span className="nav-text">{item.title}</span>
                    </Link>
                </Menu.Item>
                )
        })}
    </Menu.SubMenu>
);

export default ({ menus, ...props }) => (
    <Menu {...props}>
        {menus && menus.map(item =>
            item.subs ? renderSubMenu(item) : renderMenuItem(item)
        )}
    </Menu>
);