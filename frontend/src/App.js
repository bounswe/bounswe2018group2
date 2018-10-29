import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import Page404 from "./pages/404";
import Client from "./ProfilePages/Client";
import Freelancer from "./ProfilePages/Freelancer";

import "./reset.css";
import "./App.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={SignupPage}/>
                <Route exact path="/profile/client" component={Client}/>
                <Route exact path="/profile/freelancer" component={Freelancer}/>
                <Route component={Page404}/>
            </Switch>
        </Router>
    );
}

export default App;
