import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import Page404 from "./pages/404";
import { ClientProfilePage, FreelancerProfilePage } from "./pages/ProfilePages";

import "./reset.css";
import "./App.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={SignupPage} />
                <Route exact path="/profile/client" component={ClientProfilePage} />
                <Route
                    exact
                    path="/profile/freelancer"
                    component={FreelancerProfilePage}
                />
                <Route component={Page404} />
            </Switch>
        </Router>
    );
}

export default App;
