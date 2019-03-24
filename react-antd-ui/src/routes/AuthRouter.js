import React from 'react';
import { Route, Redirect,withRouter } from 'react-router-dom'
import {CurrentSessionCache} from "../commutils/utils/CurrentCache";

class AuthRouter extends React.Component{

    render() {
        const { component: Component, ...rest} = this.props;
        const LOGIN_STATUS = CurrentSessionCache.get("LOGIN_STATUS");
        return (
            <Route {...rest} render={props => {
                return LOGIN_STATUS
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            }} />
        )
    }

}
export default withRouter(AuthRouter);