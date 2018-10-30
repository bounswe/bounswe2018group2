import React from "react";
import Cookies from "js-cookie";
import {
    Button,
    Pane,
    Heading,
    Strong,
    TextInputField,
    Text,
    Alert
} from "evergreen-ui"
import { Redirect, Link } from "react-router-dom";
import { doLogin } from "../../data/api";
import "./style.css";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            errors: {
                email: "Email is invalid",
                password: "Password is too short"
            },
            redirect: false,
            error: "",
            emailValid: false,
            passwordValid: false,
            formValid: false,
            touched: {
                email: false,
                password: false
            }
        };
    }

    componentDidMount() {
        if (window.user) {
            this.setState({
                redirect: true
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.error && !prevState.error) {
            setTimeout(() => {
                this.setState({
                    error: ""
                });
            }, 3000)
        }
    }


    validateField(field, value) {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let validationErrors = this.state.errors;

        switch (field) {
            case "email":
                emailValid = value.match(
                    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                );
                validationErrors.email = emailValid ? "" : "email is invalid";
                break;
            case "password":
                passwordValid = value.length >= 4;
                validationErrors.password = passwordValid
                    ? ""
                    : "password is too short";
                break;
            default:
                break;
        }
        this.setState({
            errors: validationErrors,
            passwordValid: passwordValid,
            emailValid: emailValid,
            formValid: emailValid && passwordValid
        });
    }

    handleClick = () => {
        this.setState({
            loading: true
        });

        doLogin(this.state.email, this.state.password)
            .then(response => {
                response.json().then(body => {
                    if (response.ok) {
                        Cookies.set("workhubToken", body.token);
                        window.location = "/";
                        return;
                    }

                    this.setState({
                        error: body.msg,
                        loading: false
                    });
                });
            })
            .catch(err => {
                this.setState({
                    error: err.message,
                    loading: false
                });
            });
    };

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }
    handleBlur = field => evt => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    };
    render() {
        return (
            <Pane
                background="tint1"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center">
                {this.state.redirect && <Redirect to="/" />}
                {this.state.error && (
                    <Alert
                        style={{ position: "absolute", right: "50px", bottom: "50px" }}
                        intent="danger"
                        title={this.state.error}
                    />
                )}
                <Pane
                    borderRadius={5}
                    elevation={1}
                    background="white"
                    padding="24px"
                    width="440px">
                    <Heading className="textAlignCenter" size={700}>
                        Log in to WorkHub
                    </Heading>
                    <form className="loginPageForm" onSubmit={this.handleClick}>
                        <TextInputField
                            name="email"
                            isInvalid={
                                !this.state.emailValid &&
                                this.state.touched.email
                            }
                            value={this.state.email}
                            onChange={event => this.handleUserInput(event)}
                            onBlur={this.handleBlur("email")}
                            type="email"
                            required
                            label="Email"
                            placeholder="somethinglike@this.com"
                        />

                        <TextInputField
                            name="password"
                            isInvalid={
                                !this.state.passwordValid &&
                                this.state.touched.password
                            }
                            value={this.state.password}
                            onChange={event => this.handleUserInput(event)}
                            onBlur={this.handleBlur("password")}
                            label="Password"
                            type="password"
                            required
                            placeholder="somethinglike"
                        />
                        <Button
                            disabled={!this.state.formValid}
                            onClick={this.handleClick}
                            className="textAlignCenter"
                            width="100%"
                            appearance="primary"
                            type="submit"
                            isLoading={this.state.loading}
                            intent="success">
                            <Strong
                                color={this.state.formValid ? "white" : "#707070"}>
                                Login now
                            </Strong>
                        </Button>
                    </form>
                    <Pane marginTop="15px" display="flex" justifyContent="flex-end">
                        <Link to="/register">
                            <Text size={100} style={{ fontSize: "12px" }}>Not a user? Register</Text>
                        </Link>
                    </Pane>
                </Pane>
            </Pane>
        );
    }
}

export default LoginPage;
