import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./SignupPage";

import "./reset.css";
import "./App.css";

function App() {
    return (
        <Router>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/register" component={SignupPage}/>
        </Router>
    );
}

export default App;
