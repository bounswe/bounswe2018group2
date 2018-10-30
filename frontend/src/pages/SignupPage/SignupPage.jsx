import React from "react";
import {
    Button, Pane, Heading, Strong, TextInputField, SegmentedControl
} from "evergreen-ui";
import properties from "../../Properties";

const UserType = {
    FREELANCER: "Freelancer",
    CLIENT: "Client"
};

const userTypeOptions = [{
    label: UserType.FREELANCER,
    value: UserType.FREELANCER
}, {
    label: UserType.CLIENT,
    value: UserType.CLIENT
}];

class SignupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: UserType.FREELANCER,
            name: "",
            lastName: "",
            email: "",
            password: "",
            conPassword: "",
            emailValid : false,
            passwordValid : false,
            passwordMatch: false,
            formValid : false,
            touched: {
                name: false,
                lastName: false,
                email : false,
                password: false,
                conPassword: false
            }

        };
    }

    validateField(field, value){
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let passwordMatch = this.state.passwordMatch;
        let validationErrors = this.state.errors;

        switch(field){
            case "email":
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                break;
            case "password":
                passwordValid = value.length >= 6;
                break;
            case "conPassword":
                passwordMatch = this.state.password===value;
                break;
            default:
                break;
        }
        this.setState({
            errors: validationErrors,
            passwordValid: passwordValid,
            passwordMatch: passwordMatch,
            emailValid: emailValid,
            formValid: emailValid&&passwordValid&&passwordMatch
        })
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
        touched: { ...this.state.touched, [field]: true },
        });
    }
    handleClick = (val) => {
        fetch(properties.APIURLs.signup, {
            method: "post",
            body: JSON.stringify({
                email: this.state.email,
                firstName: this.state.name,
                lastName: this.state.lastName,
                password : this.state.password,
                type: this.state.type
              }),
            headers:{
                'Content-Type': 'application/json'
              }
        }
        ).then(response => {
            if (response.ok) {
                window.location = "/";
                return;
            }

            response.json().then(body => alert(body.msg));
        })
        .catch(error => console.error('Error:', error));
    }

    handleUserTypeChange = (value) => this.setState({
        type: value
    });

    render() {
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
                        Register to Workhub
                    </Heading>
                    <form className="registerPageForm">
                        <SegmentedControl
                            marginTop="30px"
                            name="typeSwitch"
                            width="100%"
                            options={userTypeOptions}
                            onChange={this.handleUserTypeChange}
                            value={this.state.userType}/>
                        <Pane display="flex" justifyContent="space-between" marginTop="15px">
                            <TextInputField
                                name="name"
                                marginRight="15px"
                                type="name"
                                required
                                label="Name"
                                placeholder="John"
                                onChange={(event) => this.handleUserInput(event)}
                                value= {this.state.name}
                                onBlur = {this.handleBlur('name')}
                                flex="1"/>
                            <TextInputField
                                name="lastName"
                                type="name"
                                required
                                placeholder="Now"
                                onChange={(event) => this.handleUserInput(event)}
                                value={this.state.lastName}
                                onBlur = {this.handleBlur('lastName')}
                                label="Surname"
                                flex="1"/>
                        </Pane>
                        <TextInputField
                            name="email"
                            type="email"
                            required
                            label="Email"
                            value={this.state.email}
                            onChange={(event) => this.handleUserInput(event)}
                            onBlur = {this.handleBlur('email')}
                            isInvalid = {!this.state.emailValid && this.state.touched.email}
                            placeholder="somethinglike@this.com"/>
                        <TextInputField
                            name="password"
                            label="Password"
                            type="password"
                            required
                            value={this.state.password}
                            onChange={(event) => this.handleUserInput(event)}
                            onBlur = {this.handleBlur('password')}
                            isInvalid = {!this.state.passwordValid && this.state.touched.password}
                            placeholder="Long and safe"/>
                        <TextInputField
                            name="conPassword"
                            label="Confirm Password"
                            type="password"
                            required
                            value={this.state.conPassword}
                            isInvalid = {!this.state.passwordMatch && this.state.touched.conPassword}
                            onChange={(event) => this.handleUserInput(event)}
                            onBlur = {this.handleBlur('conPassword')}
                            placeholder="Be sure"/>
                    </form>
                    <Button
                        className="textAlignCenter"
                        disabled = {!this.state.formValid}
                        width="100%"
                        onClick={this.handleClick}
                        appearance="primary"
                        intent="success">
                        <Strong color="white">Register now</Strong>
                    </Button>
                </Pane>
            </Pane>
        );
    }
}

export default SignupPage;