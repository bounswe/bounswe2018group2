import React from "react";
import Client from "./Client";
import Freelancer from "./Freelancer";

export default function DashboardProxy(props) {
    const { type, ...rest } = props;
    if (type === "client") {
        return <Client userType={type} {...rest}/>;
    }

    return <Freelancer userType={type} {...rest}/>
}

export {
    Client as ClientDashboard,
    Freelancer as FreelancerDashboard
}