import React from "react";
import { toaster } from "evergreen-ui";
import { Redirect } from "react-router-dom";
import { doGetJobDetail } from "../../data/api";
import JobDetailPresentation from "./JobDetailPresentation";

const bids = [
    {
        id: 1,
        userId: 1,
        name: "Ergun Erdogmus",
        description: "I can do this job very well",
        amount: 20
    },
    {
        id: 2,
        userId: 1,
        name: "Ergun Erdogmus",
        description: "I can do this job very well",
        amount: 20
    },
    {
        id: 3,
        userId: 1,
        name: "Ergun Erdogmus",
        description:
            "I can do this job very well. I can do this job very well. I can do this job very well. I can do this job very well",
        amount: 20
    }
];

const canAcceptBid = true;

class JobDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobDetail: null,
            loading: false,
            hasError: false
        };

        this.handleAcceptBidClick = this.handleAcceptBidClick.bind(this);
    }

    componentDidMount() {
        const {
            params: { id }
        } = this.props.computedMatch;
        doGetJobDetail(id)
            .then(body => {
                this.setState({
                    jobDetail: body.job
                });
            })
            .catch(err => {
                this.setState({
                    hasError: true
                });

                toaster.danger(err.message);
            });
    }

    handleAcceptBidClick(bid) {
        console.log(bid);
    }

    render() {
        if (this.state.hasError) {
            return <Redirect to="/" />;
        }

        return (
            <JobDetailPresentation
                job={this.state.jobDetail}
                canAcceptBid={canAcceptBid}
                onAcceptBidClick={this.handleAcceptBidClick}
                bids={bids}
            />
        );
    }
}

export default JobDetail;
