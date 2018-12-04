import React from "react";
import { Pane } from "evergreen-ui";
import HeaderBar from "../../../components/HeaderBar";

class Client extends React.Component {
    render() {
        return (
            <Pane background="tint1" width="100%" height="100%">
                <HeaderBar userType={this.props.userType} />
            </Pane>
        );
    }
}

export default Client;