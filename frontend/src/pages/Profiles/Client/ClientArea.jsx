import React from "react";
import {
    Pane,
    Tablist,
    Paragraph,
    Text,
    Table,
    Heading,
    toaster
} from "evergreen-ui";
import imgclient from "./images.png";
import { Redirect } from "react-router-dom";
import HeaderBar from "../../../components/HeaderBar";
import { doGetSelfJobs, doGetJobDetail } from "../../../data/api";

class ClientProfileArea extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            isSelected: false,
            selectedJobId: -1,
            jobs: [],
            freelancers: {}
        };
    }
    componentDidMount() {
        doGetSelfJobs()
            .then(body => {
                this.setState({
                    jobs: body.jobs
                });
                let newState = {};
                body.jobs.forEach(element => {
                    doGetJobDetail(element.id)
                        .then(res => {
                            if (
                                typeof res.freelancer.firstName !== "undefined"
                            ) {
                                newState[res.job.id] =
                                    res.freelancer.firstName +
                                    " " +
                                    res.freelancer.lastName;
                            } else {
                                newState[res.job.id] = "-";
                            }
                            this.setState({
                                freelancers: newState
                            });
                        })
                        .catch(err => {
                            this.setState({
                                hasError: true
                            });
                            toaster.danger(err.message);
                        });
                });
            })
            .catch(err => {
                this.setState({
                    hasError: true
                });
                toaster.danger(err.message);
            });
    }
    render() {
        if (this.state.isSelected) {
            this.setState({
                isSelected: false
            });
            return <Redirect to={`/job/${this.state.selectedJobId}`} />;
        }
        return (
            <Pane background="tint1" minHeight="100vh">
                <HeaderBar userType={this.props.user.type} />
                <Pane padding={16} background="tint1" display="flex">
                    <Pane>
                        <Pane
                            height={240}
                            width={200}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="default">
                            <br />
                            <img
                                src={imgclient}
                                alt="Profile"
                                height={240}
                                width={200}
                            />
                        </Pane>
                        <Text>
                            <Heading is="h3">
                                {this.props.user.firstName}{" "}
                                {this.props.user.lastName}
                            </Heading>
                        </Text>
                         <Pane>
                            <Tablist
                                marginBottom={16}
                                flexBasis={240}
                                marginRight={24}
                            />
                        </Pane>
                    </Pane>

                    <Pane padding={16} background="tint1" display="vertical" minWidth="90%">
                        <Text>
                            <Heading is="h1" size={600}>
                                {" "}
                                Last Activities{" "}
                            </Heading>
                        </Text>

                        <Table marginTop={20}>
                            <Table.Head>
                                <Table.TextHeaderCell>Job</Table.TextHeaderCell>
                                <Table.TextHeaderCell>
                                    Freelancer
                                </Table.TextHeaderCell>
                                <Table.TextHeaderCell>
                                    Last Activity
                                </Table.TextHeaderCell>
                                <Table.TextHeaderCell>
                                    Bidding Status
                                </Table.TextHeaderCell>
                                <Table.TextHeaderCell>
                                    Job Status
                                </Table.TextHeaderCell>
                            </Table.Head>
                            <Table.Body height={240}>
                                {this.state.jobs.map(job => (
                                    <Table.Row
                                        key={job.id}
                                        isSelectable
                                        onSelect={() => {
                                            this.setState({
                                                selectedJobId: job.id,
                                                isSelected: true
                                            });
                                        }}>
                                        <Table.TextCell>
                                            {job.header}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {this.state.freelancers[job.id]}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {new Date(
                                                job.updatedAt
                                            ).toLocaleDateString()}
                                        </Table.TextCell>
                                        <Table.TextCell isNumber>
                                            {job.bidding_status}
                                        </Table.TextCell>
                                        <Table.TextCell isNumber>
                                            {job.status}
                                        </Table.TextCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>

                        <Pane display="flex">
                            <Pane
                                key="tab0"
                                id={`panel-$"tab0"`}
                                role="tabpanel"
                                aria-labelledby="tab0"
                                aria-hidden={0 !== this.state.selectedIndex}
                                display={
                                    0 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph> </Paragraph>
                            </Pane>

                            <Pane
                                key="tab1"
                                id={`panel-$"tab1"`}
                                role="tabpanel"
                                aria-labelledby="tab1"
                                aria-hidden={1 !== this.state.selectedIndex}
                                display={
                                    1 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 1 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab2"
                                id={`panel-$"tab2"`}
                                role="tabpanel"
                                aria-labelledby="tab2"
                                aria-hidden={2 !== this.state.selectedIndex}
                                display={
                                    2 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 2 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab3"
                                id={`panel-$"tab3"`}
                                role="tabpanel"
                                aria-labelledby="tab3"
                                aria-hidden={3 !== this.state.selectedIndex}
                                display={
                                    3 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 3 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab4"
                                id={`panel-$"tab4"`}
                                role="tabpanel"
                                aria-labelledby="tab4"
                                aria-hidden={4 !== this.state.selectedIndex}
                                display={
                                    4 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 4 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab5"
                                id={`panel-$"tab5"`}
                                role="tabpanel"
                                aria-labelledby="tab5"
                                aria-hidden={5 !== this.state.selectedIndex}
                                display={
                                    5 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 5 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab6"
                                id={`panel-$"tab6"`}
                                role="tabpanel"
                                aria-labelledby="tab6"
                                aria-hidden={6 !== this.state.selectedIndex}
                                display={
                                    6 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 6 </Paragraph>
                            </Pane>
                        </Pane>
                    </Pane>
                </Pane>
            </Pane>
        );
    }
}

export default ClientProfileArea;
