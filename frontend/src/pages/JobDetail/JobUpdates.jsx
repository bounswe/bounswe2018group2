import { Pane, Paragraph, Heading, Small, Badge, toaster } from "evergreen-ui";
import React from "react";
import { toBase64 } from "../../utils/utils";
import Dropzone from "react-dropzone";
import { Button } from "evergreen-ui/commonjs/buttons";
import { TextInput } from "evergreen-ui/commonjs/text-input";
import { doCreateUpdate, doRequestUpdate, doUpload } from "../../data/api";
import RichTextFragment from "../../utils/RichTextFragment";
const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};
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
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrop(acceptedFiles) {
        acceptedFiles.forEach(file => {
            this.setState(state => {
                return {
                    message:
                        state.message +
                        acceptedFiles.reduce(
                            (prev, reduceFile) =>
                                `${prev} ![${reduceFile.name}](Uploading…)`,
                            ""
                        )
                };
            });

            return toBase64(file)
                .then(base64File => doUpload(base64File, file.name))
                .then(result => {
                    this.setState(state => {
                        const { url } = result;
                        return {
                            message: state.message.replace(
                                `![${file.name}](Uploading…)`,
                                `![${file.name}](${url})`
                            )
                        };
                    });
                })
                .catch(e => {
                    toaster.danger(e.msg);
                    this.setState(state => {
                        return {
                            message: state.message.replace(
                                `![${file.name}](Uploading…)`,
                                ""
                            )
                        };
                    });
                });
        });
    }

    handleCompleteJobClick() {
        const { job } = this.props;

        this.setState({
            completeLoading: true
        });

        doCreateUpdate(job.id, "completion", this.state.message)
            .then(() => {
                this.props.onCompleteJob(this.state.message);
                this.setState({
                    message: "",
                    completeLoading: false
                });
            })
            .catch(e => {
                toaster.danger(e.msg);
            });
    }

    handleCommitClick() {
        const { job } = this.props;
        this.setState({
            commitLoading: true
        });

        doCreateUpdate(job.id, "milestone", this.state.message)
            .then(() => {
                this.props.onCreateUpdate(this.state.message);
                this.setState({
                    message: "",
                    commitLoading: false
                });
            })
            .catch(e => {
                toaster.danger(e.msg);
            });
    }

    handleRequestUpdateClick() {
        const { job } = this.props;
        this.setState({
            requestLoading: true
        });

        doRequestUpdate(job.id, this.state.message)
            .then(() => {
                this.props.onRequestUpdate(this.state.message);
                this.setState({
                    message: "",
                    requestLoading: false
                });
            })
            .catch(e => {
                toaster.danger(e.msg);
            });
    }

    renderUpdateForm() {
        const { user } = window;
        if (user.type === "freelancer") {
            return (
                <Pane marginTop={20} display="flex">
                    <Dropzone onDrop={this.handleDrop}>
                        {({ getRootProps, isDragActive }) => {
                            return (
                                <div
                                    {...getRootProps()}
                                    style={{ position: "relative" }}>
                                    {isDragActive && (
                                        <Pane
                                            position="absolute"
                                            width="100%"
                                            height="100%"
                                            top={0}
                                            left={0}
                                            background="rgba(0, 0, 0, 0.2)"
                                            border="2px solid #000000"
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center">
                                            Drop here
                                        </Pane>
                                    )}
                                    <Pane>
                                        <TextInput
                                            placeholder="Write a commit message"
                                            onChange={ev =>
                                                this.setState({
                                                    message: ev.target.value
                                                })
                                            }
                                            value={this.state.message}
                                        />
                                        <Paragraph size={300}>
                                            Hint: You can add a file by dropping
                                            it on the input
                                        </Paragraph>
                                    </Pane>
                                </div>
                            );
                        }}
                    </Dropzone>
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
            );
        }

        return (
            <Pane marginTop={20} display="flex">
                <Dropzone onDrop={this.handleDrop}>
                    {({ getRootProps, isDragActive }) => {
                        return (
                            <div
                                {...getRootProps()}
                                style={{ position: "relative" }}>
                                {isDragActive && (
                                    <Pane
                                        position="absolute"
                                        width="100%"
                                        height="100%"
                                        top={0}
                                        left={0}
                                        background="rgba(0, 0, 0, 0.2)"
                                        border="2px solid #000000"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center">
                                        Drop here
                                    </Pane>
                                )}
                                <Pane>
                                    <TextInput
                                        placeholder="Request an update"
                                        onChange={ev =>
                                            this.setState({
                                                message: ev.target.value
                                            })
                                        }
                                        value={this.state.message}
                                    />
                                    <Paragraph size={300}>
                                        Hint: You can add a file by dropping it
                                        on the input
                                    </Paragraph>
                                </Pane>
                            </div>
                        );
                    }}
                </Dropzone>
                <Button
                    intent="danger"
                    marginLeft={7}
                    isLoading={this.state.requestLoading}
                    onClick={this.handleRequestUpdateClick}>
                    Request
                </Button>
            </Pane>
        );
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
                {job.updates
                    .slice(0)
                    .reverse()
                    .map(update => {
                        if (update.type === "request") {
                            return (
                                <Pane
                                    marginTop={20}
                                    display="flex"
                                    alignItems="top"
                                    key={update.id}>
                                    <Pane marginTop={1}>
                                        <Badge color="red">Request</Badge>
                                    </Pane>
                                    <Pane marginLeft={5}>
                                        <Heading as="h2" size={500}>
                                            {job.Client.firstName +
                                                " " +
                                                job.Client.lastName}{" "}
                                            requested an update |{" "}
                                            <Small>
                                                {dateFormatter.format(
                                                    new Date(update.createdAt)
                                                )}
                                            </Small>
                                        </Heading>
                                        {update.description && (
                                            <Paragraph>
                                                <RichTextFragment>
                                                    {update.description}
                                                </RichTextFragment>
                                            </Paragraph>
                                        )}
                                    </Pane>
                                </Pane>
                            );
                        }

                        if (update.type === "milestone") {
                            return (
                                <Pane
                                    marginTop={20}
                                    display="flex"
                                    alignItems="top"
                                    key={update.id}>
                                    <Pane marginTop={1}>
                                        <Badge color="green">Commit</Badge>
                                    </Pane>
                                    <Pane marginLeft={5}>
                                        <Heading as="h2" size={500}>
                                            {job.freelancer.firstName +
                                                " " +
                                                job.freelancer.lastName}{" "}
                                            committed an update |{" "}
                                            <Small>
                                                {dateFormatter.format(
                                                    new Date(update.createdAt)
                                                )}
                                            </Small>
                                        </Heading>
                                        {update.description && (
                                            <Paragraph>
                                                <RichTextFragment>
                                                    {update.description}
                                                </RichTextFragment>
                                            </Paragraph>
                                        )}
                                    </Pane>
                                </Pane>
                            );
                        }

                        return (
                            <Pane
                                marginTop={20}
                                display="flex"
                                alignItems="top"
                                key={update.id}>
                                <Pane marginTop={1}>
                                    <Badge color="yellow">Completion</Badge>
                                </Pane>
                                <Pane marginLeft={5}>
                                    <Heading as="h2" size={500}>
                                        {job.freelancer.firstName +
                                            " " +
                                            job.freelancer.lastName}{" "}
                                        completed the job |{" "}
                                        <Small>
                                            {dateFormatter.format(
                                                new Date(update.createdAt)
                                            )}
                                        </Small>
                                    </Heading>
                                    {update.description && (
                                        <Paragraph>
                                            <RichTextFragment>
                                                {update.description}
                                            </RichTextFragment>
                                        </Paragraph>
                                    )}
                                </Pane>
                            </Pane>
                        );
                    })}

                {job.status === "in-progress" && this.renderUpdateForm()}
                {job.status === "waiting-payment" && (
                    <Heading as="h2" size={500} marginTop={20}>
                        <Badge color="red">Payment</Badge> Waiting for payment…
                    </Heading>
                )}
                {job.status === "completed" && (
                    <Heading as="h2" size={500} marginTop={20}>
                        <Badge color="green">Payment</Badge> Payment has been
                        done. Job is all completed, Congrats!{" "}
                        <span role="img" aria-label="tada">
                            🎉
                        </span>
                    </Heading>
                )}
                {job.status === "waiting-payment" &&
                    user.type === "client" && (
                        <Button
                            marginTop={20}
                            height={56}
                            appearance="primary"
                            intent="danger"
                            onClick={this.props.onMakePaymentClick}>
                            Make payment
                        </Button>
                    )}
            </Pane>
        );
    }
}

export default JobUpdates;
