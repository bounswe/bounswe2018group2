import React from "react";
import DashboardBase from "../DashboardBase";

class Freelancer extends React.Component {
    render() {
        return (
            <DashboardBase userType={this.props.userType}/>
        );
    }
}

export default Freelancer;