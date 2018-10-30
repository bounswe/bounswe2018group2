import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute(props) {
    const { component: Component, to, loggedIn, ...rest } = props;

    return <Route to={to} render={() => {
        if (loggedIn) {
            return <Component {...rest}/>;
        }

        return <Redirect to="/login"/>;
    }}/>
}