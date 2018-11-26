import React from "react";
import DashboardBase from "../DashboardBase";

class Client extends React.Component {
    render() {
        return (
            <DashboardBase userType={this.props.userType}/>
        );
    }
}

export default Client;