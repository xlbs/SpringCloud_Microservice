import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import RouteConfigFile from './RouteConfigFile';

class CRoute extends Component {

    render() {
        return (
            <Switch>
                {
                    Object.keys(RouteConfigFile).map(key =>
                        RouteConfigFile[key].map(r => {
                            const route = r => {
                                debugger;
                                const Component = r.component;
                                const isLogged = sessionStorage.getItem("isLogin")==="1"? true : false;
                                return (
                                    <Route
                                        exact
                                        key={r.key}
                                        path={r.key}
                                        render={props => isLogged ? <Component {...props} /> : <Redirect to="/login" />}
                                    />
                                )
                            }
                            const routeSub = rSub => {
                                const superKey = rSub.key;
                                return(
                                    r.subs.map( r => {
                                        const Component = r.component;
                                        const isLogged = sessionStorage.getItem("isLogin")==="1"? true : false;
                                        return (
                                            <Route
                                                exact
                                                key={superKey+r.key}
                                                path={superKey+r.key}
                                                render={props => isLogged ? <Component {...props} /> : <Redirect to="/login" />}
                                            />
                                        )
                                    })
                                )

                            }
                            return r.component ? route(r) : routeSub(r);
                        })
                    )
                }
                <Redirect exact from='/' to='/home'/>
                {/*<Route render={() => <Redirect to="/404" />} />*/}
            </Switch>
        )
    }
}

export default CRoute