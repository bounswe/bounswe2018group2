import React from "react";
import {
    Button, Pane, Heading, Strong, TextInputField
} from "evergreen-ui";
import "./style.css";


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    handleClick = (val) => {
        fetch("http://34.210.153.98:3000/user/login", {
            method: "post", 
            body: JSON.stringify(this.state)
        }
        ).then(function(response){
            console.log(response);
        })
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
     }
    handlePasswordChange =(e) => {
        this.setState({password: e.target.value});
     }
    render(){
        return (
            <Pane
                background="tint1"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Pane
                    borderRadius={5}
                    elevation={1}
                    background="white"
                    padding="24px"
                    width="440px">
                    <Heading
                        className="textAlignCenter"
                        size={700}>
                        Log in to WorkHub
                    </Heading>
                    <form className="loginPageForm">
                        <TextInputField
                            value = {this.state.email}
                            onChange =  {this.handleEmailChange}  
                            type="email"
                            required
                            label="Email"
                            placeholder="somethinglike@this.com"/>    
                        <TextInputField
                            value = {this.state.password}
                            onChange =  {this.handlePasswordChange}  
                            label="Password"
                            type="password"
                            required
                            placeholder="somethinglike@this.com"/>
                            
                    </form>
                    <Button
                        onClick = {this.handleClick}
                        className="textAlignCenter"
                        width="100%"
                        appearance="primary"
                        intent="success">
                        <Strong color="white">Login now</Strong>
                    </Button>
                </Pane>
            </Pane>
        );

    }
}

export default LoginPage;