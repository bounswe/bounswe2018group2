import React from 'react';
import { Pane, Card } from "evergreen-ui";
import HeaderBar from '../../components/HeaderBar';

class DashboardBase extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Pane background="#fff" width="100%" height="100%">
                <HeaderBar/>
                <Card display="flex" height="100%" background="tint1" margin={5} border="default" elevation={1}>
                    <Pane flex="1" height="100%" padding={10}></Pane>
                    <Pane flex="3" height="100%" padding={10}></Pane>
                </Card>
            </Pane>
        );
    }
}

export default DashboardBase;