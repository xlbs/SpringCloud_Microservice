import React from 'react';
import { Route, Redirect,withRouter } from 'react-router-dom'

class AuthRouter extends React.Component{

    render() {
        const { component: Component, ...rest} = this.props;
        const isLogged = sessionStorage.getItem("isLogin")==="1"? true : false;
        return (
            <Route {...rest} render={props => {
                return isLogged
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            }} />
        )
    }

}
export default withRouter(AuthRouter);