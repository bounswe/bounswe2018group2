import React from "react";
import imgclient from "./default-user.png";
import { Pane, Text, Spinner } from "evergreen-ui";
import { Link } from "react-router-dom";
import "./style.css";

class JobDetailUser extends React.Component {
    render() {
        if (!this.props.user) {
            return (
                <Pane display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Spinner/>
                </Pane>
            )
        }

        return (
            <Pane display="flex" justifyContent="center" flexDirection="column">
                <img
                    src={imgclient}
                    alt="Profile"
                    height={180}
                    width={160}
                />
                <Text fontWeight="bold" src="/profile" marginTop="5px">
                    <Link to={"/profile/1"}>{this.props.user.firstName + " " + this.props.user.lastName}</Link>
                </Text>
            </Pane>
        );
    }
}

export default JobDetailUser;
