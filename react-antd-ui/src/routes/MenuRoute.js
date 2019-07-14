import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import {CurrentSessionCache} from "../commutils/utils/CurrentCache";

import NotFound from "../commutils/components/NotFound"
import handleHome from "../probusiness/comm/home/index";
import handleUserManagement from "../probusiness/comm/system/user/index";
import handleRoleManagement from "../probusiness/comm/system/role/index";
import handleMenuManagement from "../probusiness/comm/system/menu/index";
import handleLeaveProcess from "../probusiness/process/leave/index";


const menuComponent = {
    1: handleHome,
    3: handleUserManagement,
    4: handleRoleManagement,
    5: handleMenuManagement,
    7: handleLeaveProcess,
}

class MenuRoute extends React.Component{

    render(){
        const menu = CurrentSessionCache.get("MENU");
        return(
            <Switch>
                {
                   menu.map(item => {
                       const route = r => {
                           const Component = menuComponent[r.id] ? menuComponent[r.id] : NotFound;
                           const LOGIN_STATUS = CurrentSessionCache.get("LOGIN_STATUS");
                           return (
                               <Route
                                   exact
                                   key={r.id}
                                   path={r.url}
                                   render={props => LOGIN_STATUS ? <Component {...props} /> : <Redirect to="/login" />}
                               />
                           )
                       }
                       const routeSub = rSub => {
                           return(
                               rSub.children.map( r => {
                                   const Component = menuComponent[r.id] ? menuComponent[r.id] : NotFound;
                                   const LOGIN_STATUS = CurrentSessionCache.get("LOGIN_STATUS");
                                   return (
                                       <Route
                                           exact
                                           key={rSub.id}
                                           path={rSub.url+r.url}
                                           render={props => LOGIN_STATUS ? <Component {...props} /> : <Redirect to="/login" />}
                                       />
                                   )
                               })
                           )

                       }
                       return item.children.length === 0 ? route(item) : routeSub(item);
                   })
                }
                <Redirect exact from='/' to='/home'/>
            </Switch>
        )

    }

}

export default MenuRoute