import React from "react";
import { Pane, Button } from "evergreen-ui";
import { Link } from "react-router-dom";

class HeaderBar extends React.Component {
    render() {
        return (
            <Pane
                background="#DDEBF7"
                padding={16}
                display="flex"
                justifyContent="space-between">
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
                </Pane>
                <Pane>
                    <Button
                        iconBefore="envelope"
                        disabled={true}
                        height={30}
                        marginRight={16}
                        appearance="minimal"
                        intent="none">
                        Messages
                    </Button>
                    <Button
                        iconBefore="log-out"
                        disabled={true}
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
}

export default HeaderBar;
