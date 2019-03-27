import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Provider from "react-redux/es/components/Provider";
import history from '../history';
import AuthRouter from "./AuthRouter";

import handleLogin from '../probusiness/comm/login/index';
import Main from '../index'
import NotFound from "../commutils/components/NotFound";

class Routes extends React.Component{
    render(){
        const store  = this.props.store;
        return(
            <Provider store={store}>
                <Router history={history}>
                    <div id='route' className="global">
                        <Switch>
                            <Route name="登入" path="/login" component={handleLogin}/>
                            <Route name="登出" path="/logout" component={handleLogin}/>
                            <AuthRouter name="" path="/" component={Main}/> {/*进入系统*/}
                            {/*<Route component={NotFound} />*/}
                        </Switch>
                    </div>
                </Router>
            </Provider>

        )
    }
}

export default Routes;