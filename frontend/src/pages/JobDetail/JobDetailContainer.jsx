import React from "react";
import { Dialog, Heading, Paragraph, toaster } from "evergreen-ui";
import { Redirect } from "react-router-dom";
import { doGetJobDetail, doGetJobBids, doAcceptBid } from "../../data/api";
import JobDetailPresentation from "./JobDetailPresentation";

class JobDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canAcceptBid: false,
            jobDetail: null,
            bids: [],
            bidsLoading: true,
            showBidAcceptDialog: false,
            acceptBidDetails: null,
            hasError: false
        };

        this.handleAcceptBidClick = this.handleAcceptBidClick.bind(this);
        this.handleAcceptBidConfirm = this.handleAcceptBidConfirm.bind(this);
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
        this.setState({
            showBidAcceptDialog: true,
            acceptBidDetails: bid
        });
    }

    handleAcceptBidConfirm() {
        doAcceptBid(this.state.acceptBidDetails.bidId)
            .then(body => {
                // window.location.reload();
                console.log(body);
            })
            .catch(err => {
                toaster.danger(err.message);
            });
    }

    render() {
        if (this.state.hasError) {
            return <Redirect to="/" />;
        }

        return (
            <>
                {this.state.showBidAcceptDialog && (
                    <Dialog
                        isShown={this.state.showBidAcceptDialog}
                        title="Do you really want to accept this bid?"
                        intent="success"
                        onConfirm={this.handleAcceptBidConfirm}
                        onCloseComplete={() =>
                            this.setState({ showBidAcceptDialog: false })
                        }
                        confirmLabel="Accept bid">
                        <Heading>
                            {this.state.acceptBidDetails.name} •{" "}
                            {this.state.acceptBidDetails.amount}₺
                        </Heading>
                        <Paragraph>
                            {this.state.acceptBidDetails.description}
                        </Paragraph>
                    </Dialog>
                )}
                <JobDetailPresentation
                    job={this.state.jobDetail}
                    canAcceptBid={this.state.canAcceptBid}
                    onAcceptBidClick={this.handleAcceptBidClick}
                    bidsLoading={this.state.bidsLoading}
                    bids={this.state.bids}
                />
            </>
        );
    }
}

export default JobDetail;
