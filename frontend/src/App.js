import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Pane, Spinner, toaster } from "evergreen-ui";
import Cookies from "js-cookie";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import Page404 from "./pages/404";
import ProfileProxy from "./pages/Profiles";
import { doGetMember, doLogout, doGetAllCategories } from "./data/api";
import DashboardProxy from "./pages/Dashboards";
import CreateJobPage from "./pages/CreateJob";
import JobDetailPage from "./pages/JobDetail";

import "./reset.css";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: null
        };
    }
    componentDidMount() {
        window.workhubToken = Cookies.get("workhubToken");
        window.logout = () => {
            Cookies.remove("workhubToken");
            window.user = null;
            doLogout().then(() => {
                this.setState({
                    user: null
                });
            });

            window.workhubToken = "";
        };

        if (window.workhubToken) {
            this.setState({
                loading: true
            });

            Promise.all([doGetMember(), doGetAllCategories()])
                .then(([user, categoriesResp]) => {
                    window.user = user;
                    window.categories = categoriesResp.categories.reduce(
                        (prev, category) => {
                            prev[category.id] = category;
                            return prev;
                        },
                        {}
                    );

                    this.setState({
                        user,
                        categories: categoriesResp.categories,
                        loading: false
                    });
                })
                .catch(e => {
                    if (e.message !== "Not a valid token") {
                        toaster.danger(e.message);
                    }

                    this.setState({
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { user, loading } = this.state;
        if (loading) {
            return (
                <Pane
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height={400}>
                    <Spinner />
                </Pane>
            );
        }

        return (
            <Router>
                <Switch>
                    <PrivateRoute
                        exact
                        loggedIn={user}
                        path="/"
                        component={props => (
                            <DashboardProxy type={user.type} {...props} />
                        )}
                    />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={SignupPage} />
                    <PrivateRoute
                        exact
                        path="/profile"
                        loggedIn={user}
                        component={props => (
                            <ProfileProxy user={user} {...props} />
                        )}
                    />
                    <PrivateRoute
                        exact
                        path="/job/create"
                        loggedIn={user}
                        component={CreateJobPage}
                    />
                    <PrivateRoute
                        path="/job/:id"
                        loggedIn={user}
                        component={JobDetailPage}
                    />
                    <Route component={Page404} />
                </Switch>
            </Router>
        );
    }
}

export default App;
