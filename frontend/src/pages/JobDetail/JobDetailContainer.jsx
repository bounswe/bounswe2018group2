import React from "react";
import { toaster } from "evergreen-ui";
import { Redirect } from "react-router-dom";
import { doGetJobDetail, doGetJobBids } from "../../data/api";
import JobDetailPresentation from "./JobDetailPresentation";

class JobDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canAcceptBid: false,
            jobDetail: null,
            bids: [],
            bidsLoading: true,
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
                    jobDetail: body.job,
                    canAcceptBid: body.job.Client.id === window.user.id
                });
            })
            .catch(err => {
                this.setState({
                    hasError: true
                });

                toaster.danger(err.message);
            });

        doGetJobBids(id)
            .then(body => {
                this.setState({
                    bidsLoading: false,
                    bids: body.bids
                });
            })
            .catch(err => {
                this.setState({
                    bidsLoading: false,
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
                canAcceptBid={this.state.canAcceptBid}
                onAcceptBidClick={this.handleAcceptBidClick}
                bidsLoading={this.state.bidsLoading}
                bids={this.state.bids}
            />
        );
    }
}

export default JobDetail;
