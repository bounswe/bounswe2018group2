import React from "react";
import {
    Pane,
    Badge,
    Spinner,
    Strong,
    Heading,
    Paragraph,
    Icon,
    SearchInput,
    Text
} from "evergreen-ui";
import { cropText } from "../../utils";
import { Link } from "react-router-dom";
import { doGetAllJobs, doGetRelatedWords } from "../../data/api";
import HeaderBar from "../../components/HeaderBar";
import FilterPane from "./FilterPane";
import debounce from "lodash.debounce";
const options = { year: "numeric", month: "long", day: "numeric" };
const dateFormatter = new Intl.DateTimeFormat("en-EN", options);

const JobCard = props => {
    const {
        jobId,
        title,
        description,
        createdDate,
        // bidNumber,
        /* categories, */
        price,
        clientName
    } = props;

    return (
        <Pane
            elevation={0}
            width="100%"
            marginTop="10px"
            padding="20px"
            display="flex"
            background="tint1">
            <Pane flex={4}>
                <Heading size={500}>
                    <Link to={`/job/${jobId}`}>{title}</Link>
                </Heading>
                <Paragraph marginTop="10px" color="muted">
                    {description && cropText(description, 220)}
                </Paragraph>
                <Pane marginTop={10}>
                    <Pane display="flex" justifyContent="space-between">
                        <Pane display="flex" alignItems="center">
                            <Icon icon="time" color="default" />{" "}
                            <Text marginLeft={5}>
                                Opened at {dateFormatter.format(createdDate)}
                                {/* {bidNumber} bid */}
                            </Text>
                        </Pane>
                        <Pane display="flex" alignItems="center">
                            <Icon icon="user" color="default" />
                            <Text marginLeft={5}>
                                <Strong href="#" color="default">
                                    {clientName}
                                </Strong>
                            </Text>
                        </Pane>
                    </Pane>
                    <Pane display="flex" alignItems="center" marginTop={5}>
                        <Icon icon="tag" color="default" />
                        <Text marginLeft={5}>
                            <Badge isSolid color="green">
                                Article Writing
                            </Badge>{" "}
                            <Badge isSolid color="yellow">
                                Web development
                            </Badge>{" "}
                            <Badge isSolid color="orange">
                                Javascript
                            </Badge>{" "}
                            <Badge isSolid color="purple">
                                HTML
                            </Badge>
                        </Text>
                    </Pane>
                </Pane>
            </Pane>
            <Pane flex={1} justifyContent="flex-end">
                <Heading size={700} textAlign="right">
                    {price}₺
                </Heading>
            </Pane>
        </Pane>
    );
};

class DashboardBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            errMessage: "",
            jobsLoading: true,
            searchValue: "",
            searchParams: [],
            filter: {
                category: "",
                minPrice: "",
                maxPrice: "",
                minDuration: "",
                maxDuration: ""
            }
        };

        this.handleApplyFilter = this.handleApplyFilter.bind(this);
        this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
        this.handleSearchChangeValue = this.handleSearchChangeValue.bind(this);
        this.handleUpdateSearchParams = debounce(
            this.handleUpdateSearchParams,
            500
        ).bind(this);
    }

    getFilteredJobs() {
        const { filter, jobs, searchParams } = this.state;
        const filteredJobs = jobs.filter(job => {
            if (filter.category && job.category !== filter.category) {
                return false;
            }

            if (filter.minPrice && job.price <= filter.minPrice) {
                return false;
            }

            if (filter.maxPrice && job.price >= filter.maxPrice) {
                return false;
            }

            if (filter.minDuration && job.duration <= filter.minDuration) {
                return false;
            }

            if (filter.maxDuration && job.duration > filter.maxDuration) {
                return false;
            }

            return true;
        });

        if (!searchParams.length) {
            return filteredJobs;
        }

        // For a param in search params; its description or name contains the param
        return filteredJobs.filter(job =>
            searchParams.some(
                param =>
                    job.header.includes(param) ||
                    job.description.includes(param)
            )
        );
    }

    handleUpdateSearchParams() {
        doGetRelatedWords(this.state.searchValue).then(words => {
            this.setState({
                searchParams: [
                    this.state.searchValue,
                    ...words.slice(0, 3).map(wordObj => wordObj.word)
                ] // Gets first three suggested words
            });
        });
    }

    handleApplyFilter(filter) {
        this.setState({
            filter
        });
    }

    handleRemoveFilter(filterName) {
        const { filter } = this.state;
        filter[filterName] = "";
        this.setState({
            filter
        });
    }

    componentDidMount() {
        doGetAllJobs()
            .then(jobsResult => {
                this.setState({
                    jobs: jobsResult.jobs,
                    jobsLoading: false
                });
            })
            .catch(err => {
                this.setState({
                    jobsError: err.message,
                    jobsLoading: false
                });
            });
    }

    handleSearchChangeValue(ev) {
        const { value } = ev.target;
        this.setState({
            searchValue: value,
            searchParams: [value]
        });

        this.handleUpdateSearchParams();
    }

    render() {
        const filteredJobs = this.getFilteredJobs();
        return (
            <Pane background="tint1" width="100%" height="100%">
                <HeaderBar userType={this.props.userType} />
                <Pane
                    display="flex"
                    height="auto"
                    minHeight="100%"
                    background="tint1"
                    paddingY={30}
                    margin={5}>
                    <FilterPane
                        {...this.state.filter}
                        onApplyFilter={this.handleApplyFilter}
                        onRemoveFilter={this.handleRemoveFilter}
                    />
                    <Pane
                        flex="3"
                        background="white"
                        border="default"
                        height="100%"
                        padding={30}
                        marginLeft={20}
                        marginRight={40}
                        style={{ flexBasis: "75%" }}>
                        <SearchInput
                            placeholder="Search projects"
                            marginTop={10}
                            height={40}
                            onChange={this.handleSearchChangeValue}
                            value={this.state.searchValue}
                            width="100%"
                        />
                        {this.state.searchParams.length > 1 && (
                            <Pane marginTop={5}>
                                <Text color="muted">
                                    Also searched for similar words:{" "}
                                    {this.state.searchParams
                                        .slice(1)
                                        .join(", ")}
                                </Text>
                            </Pane>
                        )}
                        <Heading marginTop={30} size={800}>
                            {this.props.userType === "client"
                                ? `All Jobs`
                                : `Suggested Jobs`}
                        </Heading>
                        <Paragraph marginTop={4} size={400}>
                            {this.props.userType !== "client" &&
                                `Curated with your old projects and preferences in
                            mind.`}
                        </Paragraph>
                        <Pane marginTop={16}>
                            {!this.state.jobsLoading &&
                                !!filteredJobs.length &&
                                filteredJobs
                                    .filter(job => !!job.header)
                                    .map(job => {
                                        return (
                                            <JobCard
                                                key={job.id}
                                                jobId={job.id}
                                                title={job.header}
                                                description={job.description}
                                                createdDate={
                                                    new Date(job.createdAt)
                                                }
                                                bidNumber={5}
                                                price={job.price}
                                                clientName={`${
                                                    job.Client.firstName
                                                } ${job.Client.lastName.substring(
                                                    0,
                                                    1
                                                )}.`}
                                            />
                                        );
                                    })}
                            {!this.state.jobsLoading &&
                                this.state.searchValue &&
                                !filteredJobs.length && (
                                    <Pane
                                        display="flex"
                                        justifyContent="center">
                                        <Paragraph>
                                            No job found for search value:{" "}
                                            {this.state.searchValue}
                                        </Paragraph>
                                    </Pane>
                                )}
                            {this.state.jobsLoading && (
                                <Pane display="flex" justifyContent="center">
                                    <Spinner />
                                </Pane>
                            )}
                        </Pane>
                    </Pane>
                </Pane>
            </Pane>
        );
    }
}

export default DashboardBase;
