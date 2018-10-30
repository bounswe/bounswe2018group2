import React from 'react';
import Client from "./Client";
import Freelancer from "./Freelancer";

export default function ProfileProxy(props) {
    if (props.type === "client") {
        return <Client {...props}/>;
    }

    return <Freelancer {...props}/>
}