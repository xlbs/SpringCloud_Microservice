import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem = item => ( // item.route 菜单单独跳转的路由
    <Menu.Item key={item.id}>
        <Link to={item.url}>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.name}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = subItem => (
    <Menu.SubMenu
        key={subItem.id}
        title={
            <span>
                {subItem.icon && <Icon type={subItem.icon} />}
                <span className="nav-text">{subItem.name}</span>
            </span>
        }
    >
        {subItem.children.map( item => {
            return(
                <Menu.Item key={item.id}>
                    <Link to={subItem.url+item.url}>
                        {item.icon && <Icon type={item.icon} />}
                        <span className="nav-text">{item.name}</span>
                    </Link>
                </Menu.Item>
                )
        })}
    </Menu.SubMenu>
);

export default ({ menus, ...props }) => (
    <Menu {...props}>
        {menus && menus.map(item =>
            item.children.length === 0 ? renderMenuItem(item) : renderSubMenu(item)
        )}
    </Menu>
);