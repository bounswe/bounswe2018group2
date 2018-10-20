import React from "react";
import { Button, Pane, Heading, Strong, TextInputField } from "evergreen-ui";
import "./style.css";

function LoginPage(props) {
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
                <Heading className="textAlignCenter" size={700}>
                    Log in to WorkHub
                </Heading>
                <form className="loginPageForm">
                    <TextInputField
                        type="email"
                        required
                        label="Email"
                        placeholder="somethinglike@this.com"
                    />
                    <TextInputField
                        label="Password"
                        type="password"
                        required
                        placeholder="somethinglike@this.com"
                    />
                </form>
                <Button
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

export default LoginPage;
