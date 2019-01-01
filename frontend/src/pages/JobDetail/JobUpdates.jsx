import { Pane, Paragraph, Heading, Small, Badge, toaster } from "evergreen-ui";
import React from "react";
import { Button } from "evergreen-ui/commonjs/buttons";
import { TextInput } from "evergreen-ui/commonjs/text-input";
import { doCreateUpdate, doRequestUpdate } from "../../data/api";
const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
const dateFormatter = new Intl.DateTimeFormat("en-EN", options);

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
        const { job } = this.props;

        this.setState({
            completeLoading: true
        });

        doCreateUpdate(job.id, "completion", this.state.message).then(() => {
            this.props.onCompleteJob(this.state.message);
            this.setState({
                message: "",
                completeLoading: false
            });
        }).catch(e => {
            toaster.danger(e.msg);
        });
    }

    handleCommitClick() {
        const { job } = this.props;
        this.setState({
            commitLoading: true
        });

        doCreateUpdate(job.id, "milestone", this.state.message).then(() => {
            this.props.onCreateUpdate(this.state.message);
            this.setState({
                message: "",
                commitLoading: false
            });
        }).catch(e => {
            toaster.danger(e.msg);
        });
    }

    handleRequestUpdateClick() {
        const { job } = this.props;
        this.setState({
            requestLoading: true
        });

        doRequestUpdate(job.id, this.state.message).then(() => {
            this.props.onRequestUpdate(this.state.message);
            this.setState({
                message: "",
                requestLoading: false
            });
        }).catch(e => {
            toaster.danger(e.msg);
        });
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
                {job.updates.slice(0).reverse().map(update => {
                    if (update.type === "request") {
                        return (
                            <Pane marginTop={20} display="flex" alignItems="top" key={update.id}>
                                <Pane marginTop={1}>
                                    <Badge color="red">Request</Badge>
                                </Pane>
                                <Pane marginLeft={5}>
                                    <Heading as="h2" size={500}>
                                        {job.Client.firstName + " " + job.Client.lastName} requested an update | <Small>{dateFormatter.format(new Date(update.createdAt))}</Small>
                                    </Heading>
                                    {update.description && <Paragraph>{update.description}</Paragraph>}
                                </Pane>
                            </Pane>
                        )
                    }

                    if (update.type === "milestone") {
                        return (
                            <Pane marginTop={20} display="flex" alignItems="top" key={update.id}>
                                <Pane marginTop={1}>
                                    <Badge color="green">Commit</Badge>
                                </Pane>
                                <Pane marginLeft={5}>
                                    <Heading as="h2" size={500}>
                                        {job.freelancer.firstName + " " + job.freelancer.lastName} committed an update | <Small>{dateFormatter.format(new Date(update.createdAt))}</Small>
                                    </Heading>
                                    {update.description && <Paragraph>{update.description}</Paragraph>}
                                </Pane>
                            </Pane>
                        );
                    }

                    return (
                        <Pane marginTop={20} display="flex" alignItems="top" key={update.id}>
                            <Pane marginTop={1}>
                                <Badge color="yellow">Completion</Badge>
                            </Pane>
                            <Pane marginLeft={5}>
                                <Heading as="h2" size={500}>
                                    {job.freelancer.firstName + " " + job.freelancer.lastName} completed the job | <Small>{dateFormatter.format(new Date(update.createdAt))}</Small>
                                </Heading>
                                {update.description && <Paragraph>{update.description}</Paragraph>}
                            </Pane>
                        </Pane>
                    )
                })}
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
