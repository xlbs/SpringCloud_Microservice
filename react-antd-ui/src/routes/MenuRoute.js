import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import {CurrentSessionCache} from "../commutils/utils/CurrentCache";

import handleHome from "../probusiness/home/index";
import handleUserManagement from "../probusiness/system/user/index";
import handleRoleManagement from "../probusiness/system/role/index";
import handleMenuManagement from "../probusiness/system/menu/index";


const menuComponent = {
    1: handleHome,
    3: handleUserManagement,
    4: handleRoleManagement,
    5: handleMenuManagement,
}

class MenuRoute extends React.Component{

    render(){
        const menu = CurrentSessionCache.get("MENU");
        return(
            <Switch>
                {
                   menu.map(item => {
                       const route = r => {
                           const Component = menuComponent[r.menuId];
                           const LOGIN_STATUS = CurrentSessionCache.get("LOGIN_STATUS");
                           return (
                               <Route
                                   exact
                                   key={r.menuId}
                                   path={r.url}
                                   render={props => LOGIN_STATUS ? <Component {...props} /> : <Redirect to="/login" />}
                               />
                           )
                       }
                       const routeSub = rSub => {
                           return(
                               rSub.childMenu.map( r => {
                                   const Component = menuComponent[r.menuId];
                                   const LOGIN_STATUS = CurrentSessionCache.get("LOGIN_STATUS");
                                   return (
                                       <Route
                                           exact
                                           key={rSub.menuId}
                                           path={rSub.url+r.url}
                                           render={props => LOGIN_STATUS ? <Component {...props} /> : <Redirect to="/login" />}
                                       />
                                   )
                               })
                           )

                       }
                       return item.childMenu.length === 0 ? route(item) : routeSub(item);
                   })
                }
                <Redirect exact from='/' to='/home'/>
            </Switch>
        )

    }

}

export default MenuRoute