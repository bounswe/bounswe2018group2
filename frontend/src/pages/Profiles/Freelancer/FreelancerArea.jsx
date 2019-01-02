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
    Checkbox,
    toaster
} from "evergreen-ui";
import imgfreelancer from "./images.jpg";
import StarRatingComponent from "react-star-rating-component";
import HeaderBar from "../../../components/HeaderBar";
import debounce from "lodash.debounce";
import {
    doGetSelfJobs,
    doAddInterests,
    doRemoveInterests
} from "../../../data/api";
import { Redirect } from "react-router-dom";

class FreelancerProfileArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            isSelected: false,
            selectedCategories: props.user.categories.fulfillmentValue.map(
                category => category.category_id
            ),
            selectedJobId: -1,
            jobs: []
        };

        this.handleAddInterest = debounce(this.handleAddInterest, 250).bind(
            this
        );
        this.handleRemoveInterest = debounce(
            this.handleRemoveInterest,
            250
        ).bind(this);
    }

    componentDidMount() {
        console.log(this.props.user);
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

    handleAddInterest(id) {
        doAddInterests([id])
            .then(() => {
                toaster.success(
                    `Added category ${window.categories[id].name} to interests`
                );
            })
            .catch(e => {
                toaster.danger(
                    `Couldn't add category ${window.categories[id].name}`
                );
                console.error(e);
            });
    }

    handleRemoveInterest(id) {
        doRemoveInterests([id])
            .then(() => {
                toaster.success(
                    `Removed category ${window.categories[id].name}`
                );
            })
            .catch(e => {
                toaster.danger(
                    `Couldn't remove category ${window.categories[id].name}`
                );
                console.error(e);
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

                    <Pane padding={16} background="tint1" display="vertical">
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
                                    flexWrap="wrap"
                                    border="default">
                                    <Heading is="h2" padding={5}>
                                        My Preferences{" "}
                                    </Heading>
                                    {Object.keys(window.categories).map(key => {
                                        const category = window.categories[key];
                                        return (
                                            <Checkbox
                                                label={category.name}
                                                checked={this.state.selectedCategories.includes(
                                                    category.id
                                                )}
                                                marginLeft={15}
                                                onChange={ev => {
                                                    this.setState(state => {
                                                        let selectedCategories = state.selectedCategories.splice(
                                                            0
                                                        );
                                                        const isChecked = selectedCategories.includes(
                                                            category.id
                                                        );
                                                        if (isChecked) {
                                                            const index = selectedCategories.indexOf(
                                                                category.id
                                                            );
                                                            selectedCategories.splice(
                                                                index,
                                                                1
                                                            );
                                                            this.handleRemoveInterest(
                                                                category.id
                                                            );
                                                        } else {
                                                            selectedCategories.push(
                                                                category.id
                                                            );
                                                            this.handleAddInterest(
                                                                category.id
                                                            );
                                                        }

                                                        return {
                                                            selectedCategories
                                                        };
                                                    });
                                                }}
                                            />
                                        );
                                    })}
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
