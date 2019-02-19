import React from 'react';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import handleLogin from './app/login/index';
import handleMain from './app/main/index';
import handleHome from './app/home/index';

class Routes extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        const store  = this.props.store;
        return(
            <Provider store = {store}>
                <Router history={browserHistory}>
                    <Route name="登入" path="/" getComponent={(location, cb) => handleLogin(location, cb, store)}/>

                    <Route name=" " path="/main" getComponent={(location, cb) => handleMain(location, cb, store)}>
                        <IndexRoute name="首页" getComponent={(location, cb) => handleHome(location, cb, store)}/>{/*访问/main，默认加载的路由*/}
                        <Route name="首页" path="/home" getComponent={(location, cb) => handleHome(location, cb, store)}/>
                        <Route name="数据管理" path="/dataManage" getComponent={(location, cb) => handleHome(location, cb, store)}>

                        </Route>
                        <Route name="系统管理" path="/systemManage" getComponent={(location, cb) => handleHome(location, cb, store)}>

                        </Route>
                    </Route>

                </Router>

            </Provider>
        )
    }


}

export default Routes;