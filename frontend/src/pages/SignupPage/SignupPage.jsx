import React from "react";
import {
    Button, Pane, Heading, Strong, TextInputField, SegmentedControl
} from "evergreen-ui";

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
            userType: UserType.FREELANCER
        };
    }

    handleUserTypeChange = (value) => this.setState({
        userType: value
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
                            height="32px"
                            options={userTypeOptions}
                            onChange={this.handleUserTypeChange}
                            value={this.state.userType}/>
                        <Pane display="flex" justifyContent="space-between" marginTop="15px">
                            <TextInputField
                                marginRight="15px"
                                type="name"
                                required
                                label="Name"
                                placeholder="John"
                                flex="1"/>
                            <TextInputField
                                type="name"
                                required
                                placeholder="Now"
                                label="Surname"
                                flex="1"/>
                        </Pane>
                        <TextInputField
                            type="email"
                            required
                            label="Email"
                            placeholder="somethinglike@this.com"/>
                        <TextInputField
                            label="Password"
                            type="password"
                            required
                            placeholder="Long and safe"/>
                        <TextInputField
                            label="Confirm Password"
                            type="password"
                            required
                            placeholder="Be sure"/>
                    </form>
                    <Button
                        className="textAlignCenter"
                        width="100%"
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