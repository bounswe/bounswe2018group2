import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from '@material-ui/core/Button'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Hello, React!</p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Button variant="contained" color="primary">
                        Learn React
                    </Button>
                    
                </a>
            </header>
        </div>
    );
}

export default App;
