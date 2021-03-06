import React from "react";
import { Pane, Button } from "evergreen-ui";
import { Link } from "react-router-dom";

function HeaderBar(props) {
    return (
        <Pane
            background="#FFF"
            padding={16}
            display="flex"
            justifyContent="space-between"
            elevation={1}>
            <Pane>
                <Button
                    iconBefore="home"
                    height={30}
                    marginRight={16}
                    appearance="minimal"
                    intent="none">
                    <Link to="/">Home Page</Link>
                </Button>
                <Button
                    iconBefore="mugshot"
                    height={30}
                    marginRight={16}
                    appearance="minimal"
                    intent="none">
                    <Link to="/profile">My Profile</Link>
                </Button>
                {props.userType === "client" && (
                    <Button
                        iconBefore="mugshot"
                        height={30}
                        marginRight={16}
                        appearance="minimal"
                        intent="none">
                        <Link to="/job/create">Create Job</Link>
                    </Button>
                )}
            </Pane>
            <Pane>
                <Button
                    iconBefore="log-out"
                    onClick={window.logout}
                    height={30}
                    marginRight={16}
                    appearance="minimal"
                    intent="none">
                    Log out
                </Button>
            </Pane>
        </Pane>
    );
}

export default HeaderBar;
