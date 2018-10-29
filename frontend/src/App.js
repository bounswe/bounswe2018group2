import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Pane, Spinner } from "evergreen-ui";
import Cookies from "js-cookie";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import Page404 from "./pages/404";
import { ClientProfilePage, FreelancerProfilePage } from "./pages/ProfilePages";

import "./reset.css";
import "./App.css";
import { doGetMember } from "./data/api";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            user: null
        };
    }
    componentDidMount() {
        window.workhubToken = Cookies.get("workhubToken");
        if (window.workhubToken) {
            this.setState({
                loading: true
            });
            doGetMember().then(response => {
                if (!response.ok) {
                    throw new Error("User not logged in");
                }

                return response.json();
            }).then(body => {
                window.user = body;
                this.setState({
                    user: body,
                    loading: false
                });
            }).catch(() => {
                this.setState({
                    loading: false
                });
            });
        }
    }

    render() {
        const { user, loading } = this.state;
        if (loading) {
            return (
                <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
                    <Spinner />
                </Pane>
            )
        }

        return (
            <Router>
                <Switch>
                    <PrivateRoute
                        exact
                        loggedIn={user}
                        path="/"
                        component={ClientProfilePage}
                    />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={SignupPage} />
                    <PrivateRoute
                        exact
                        path="/profile/client"
                        loggedIn={user}
                        component={ClientProfilePage}
                    />
                    <PrivateRoute
                        exact
                        path="/profile/freelancer"
                        loggedIn={user}
                        component={FreelancerProfilePage}
                    />
                    <Route component={Page404} />
                </Switch>
            </Router>
        );
    }
}

export default App;
