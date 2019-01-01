import { Pane, Paragraph, Heading, Badge } from "evergreen-ui";
import React from "react";
import { Button } from "evergreen-ui/commonjs/buttons";
import { TextInput } from "evergreen-ui/commonjs/text-input";

class JobUpdates extends React.Component {
    render() {
        const { user } = window;
        const { job } = this.props;
        if (user.type === "client" && user.id !== job.Client.id) {
            return (
                <Pane>
                    <Paragraph>This job is taken</Paragraph>
                </Pane>
            );
        }

        if (user.type === "freelancer" && user.id !== job.freelancer.id) {
            return (
                <Pane>
                    <Paragraph>Bidding for this job is closed.</Paragraph>
                </Pane>
            );
        }

        return (
            <Pane display="flex" flexDirection="column">
                <Heading size={700} marginBottom={10}>
                    Job updates
                </Heading>
                <Pane marginTop={20} display="flex" alignItems="top">
                    <Pane marginTop={1}>
                        <Badge color="red">Request</Badge>
                    </Pane>
                    <Pane marginLeft={5}>
                        <Heading as="h2" size={500}>
                            Ergun Erdogmus requested an update
                        </Heading>
                        <Paragraph>What state are we in?</Paragraph>
                    </Pane>
                </Pane>
                <Pane marginTop={20} display="flex" alignItems="top">
                    <Pane marginTop={1}>
                        <Badge color="green">Commit</Badge>
                    </Pane>
                    <Pane marginLeft={5}>
                        <Heading as="h2" size={500}>
                            Freelancer Ali committed an update
                        </Heading>
                        <Paragraph>We are doing great champ.</Paragraph>
                    </Pane>
                </Pane>
                {/* <Pane marginTop={20}>
                    <TextInput placeholder="Write a commit message" />
                    <Button intent="success" marginLeft={7}>
                        Commit
                    </Button>
                    <Button
                        appearance="primary"
                        intent="success"
                        marginLeft={7}>
                        Complete Job
                    </Button>
                </Pane> */}
                <Pane marginTop={20}>
                    <TextInput placeholder="Request an update" />
                    <Button intent="danger" marginLeft={7}>
                        Request
                    </Button>
                </Pane>
            </Pane>
        );
    }
}

export default JobUpdates;
