import React from "react";
import {
    Pane,
    Tablist,
    SidebarTab,
    Paragraph,
    Text,
    Table,
    Button,
    Heading,
    toaster
} from "evergreen-ui";
import imgfreelancer from "./images.jpg";
import StarRatingComponent from "react-star-rating-component";
import HeaderBar from "../../../components/HeaderBar";
import { doGetSelfJobs } from "../../../data/api";
import { Redirect } from "react-router-dom";

class FreelancerProfileArea extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            isSelected: false,
            selectedJobId: -1,
            jobs: []
        };
    }

    componentDidMount() {
        doGetSelfJobs()
            .then(body => {
                this.setState({
                    jobs: body.jobs
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
            <Pane background="tint1">
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
                                src={imgfreelancer}
                                alt="Profile"
                                height={240}
                                width={200}
                            />
                        </Pane>

                        <StarRatingComponent
                            name="Rating"
                            editing={false}
                            starCount={5}
                            value={4}
                        />

                        <Pane>
                            <Tablist
                                marginBottom={16}
                                flexBasis={240}
                                marginRight={24}>
                                <SidebarTab
                                    key="tab0"
                                    id="tab0"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 0 })
                                    }
                                    isSelected={0 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Homepage
                                </SidebarTab>

                                <SidebarTab
                                    key="tab1"
                                    id="tab1"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 1 })
                                    }
                                    isSelected={1 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Connections
                                </SidebarTab>

                                <SidebarTab
                                    key="tab2"
                                    id="tab2"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 2 })
                                    }
                                    isSelected={2 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Set Filters
                                </SidebarTab>

                                <SidebarTab
                                    key="tab3"
                                    id="tab3"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 3 })
                                    }
                                    isSelected={3 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Edit Profile
                                </SidebarTab>

                                <SidebarTab
                                    key="tab4"
                                    id="tab4"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 4 })
                                    }
                                    isSelected={4 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Skills
                                </SidebarTab>

                                <SidebarTab
                                    key="tab5"
                                    id="tab5"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 5 })
                                    }
                                    isSelected={5 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Delete Account
                                </SidebarTab>

                                <Button appearance="primary" marginTop={20}>
                                    {" "}
                                    GET PROJECT!
                                </Button>
                            </Tablist>
                        </Pane>
                    </Pane>

                    <Pane padding={16} background="tint1" display="vertical">
                        <Pane
                            height={120}
                            width={1000}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="default">
                            <Text>
                                <Heading is="h3">Elenore Deren Yıldız </Heading>
                                <Paragraph size={400} marginTop="default">
                                    Translator : English, French, Turkish, both
                                    ways. Looking to find short and simple jobs
                                    to earn money, as I can not afford a full
                                    time job.
                                </Paragraph>
                            </Text>
                        </Pane>

                        <Table marginTop={20}>
                            <Table.Head>
                                <Table.TextHeaderCell>Job</Table.TextHeaderCell>
                                <Table.TextHeaderCell>
                                    Client
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
                                            {job.Client.firstName +
                                                " " +
                                                job.Client.lastName}
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
                                padding={5}
                                background="blueTint"
                                display="vertical">
                                <Pane
                                    key="tab2"
                                    id={`panel-$"tab2"`}
                                    role="tabpanel"
                                    aria-labelledby="tab2"
                                    height={200}
                                    width={900}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    border="default"
                                    aria-hidden={2 !== this.state.selectedIndex}
                                    display={
                                        2 === this.state.selectedIndex
                                            ? "block"
                                            : "none"
                                    }>
                                    <Heading is="h1" padding={5}>
                                        My Preferences{" "}
                                    </Heading>
                                    <Component initialState={{ checked: true }}>
                                        {({ state, setState }) => (
                                            <Checkbox
                                                label="Controlled usage"
                                                checked={state.checked}
                                                onChange={e =>
                                                    setState({
                                                        checked:
                                                            e.target.checked
                                                    })
                                                }
                                            />
                                        )}
                                    </Component>
                                    <Component initialState={{ checked: true }}>
                                        {({ state, setState }) => (
                                            <Checkbox
                                                label="Controlled usage"
                                                checked={state.checked}
                                                onChange={e =>
                                                    setState({
                                                        checked:
                                                            e.target.checked
                                                    })
                                                }
                                            />
                                        )}
                                    </Component>
                                    <Component initialState={{ checked: true }}>
                                        {({ state, setState }) => (
                                            <Checkbox
                                                label="Controlled usage"
                                                checked={state.checked}
                                                onChange={e =>
                                                    setState({
                                                        checked:
                                                            e.target.checked
                                                    })
                                                }
                                            />
                                        )}
                                    </Component>
                                    <Component initialState={{ checked: true }}>
                                        {({ state, setState }) => (
                                            <Checkbox
                                                label="Controlled usage"
                                                checked={state.checked}
                                                onChange={e =>
                                                    setState({
                                                        checked:
                                                            e.target.checked
                                                    })
                                                }
                                            />
                                        )}
                                    </Component>
                                    <Button appearance="primary" marginTop={20}>
                                        {" "}
                                        Add Categories
                                    </Button>
                                </Pane>
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

export default FreelancerProfileArea;
