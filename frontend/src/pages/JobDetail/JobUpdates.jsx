import { Pane, Paragraph, Heading, Badge } from "evergreen-ui";
import React from "react";
import { Button } from "evergreen-ui/commonjs/buttons";
import { TextInput } from "evergreen-ui/commonjs/text-input";

class JobUpdates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            completeLoading: false,
            commitLoading: false,
            requestLoading: false
        };

        this.handleCompleteJobClick = this.handleCompleteJobClick.bind(this);
        this.handleCommitClick = this.handleCommitClick.bind(this);
        this.handleRequestUpdateClick = this.handleRequestUpdateClick.bind(
            this
        );
    }

    handleCompleteJobClick() {
        this.setState({
            completeLoading: true
        });

        setTimeout(() => {
            this.setState({
                completeLoading: false
            });
        }, 2000);
    }

    handleCommitClick() {
        this.setState({
            commitLoading: true
        });

        setTimeout(() => {
            this.setState({
                commitLoading: false
            });
        }, 2000);
    }

    handleRequestUpdateClick() {
        this.setState({
            requestLoading: true
        });

        setTimeout(() => {
            this.setState({
                requestLoading: false
            });
        }, 2000);
    }

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
                {user.type === "freelancer" && (
                    <Pane marginTop={20}>
                        <TextInput
                            placeholder="Write a commit message"
                            onChange={ev =>
                                this.setState({ message: ev.target.value })
                            }
                            value={this.state.message}
                        />
                        <Button
                            intent="success"
                            marginLeft={7}
                            onClick={this.handleCommitClick}
                            isLoading={this.state.commitLoading}>
                            Commit
                        </Button>
                        <Button
                            appearance="primary"
                            intent="success"
                            marginLeft={7}
                            onClick={this.handleCompleteJobClick}
                            isLoading={this.state.completeLoading}>
                            Complete Job
                        </Button>
                    </Pane>
                )}
                {user.type === "client" && (
                    <Pane marginTop={20}>
                        <TextInput
                            placeholder="Request an update"
                            onChange={ev =>
                                this.setState({ message: ev.target.value })
                            }
                            value={this.state.message}
                        />
                        <Button
                            intent="danger"
                            marginLeft={7}
                            isLoading={this.state.requestLoading}
                            onClick={this.handleRequestUpdateClick}>
                            Request
                        </Button>
                    </Pane>
                )}
            </Pane>
        );
    }
}

export default JobUpdates;
