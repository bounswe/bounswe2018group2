import React from "react";
import { Dialog, Heading, Paragraph, toaster } from "evergreen-ui";
import { Redirect } from "react-router-dom";
import {
    doGetJobDetail,
    doGetJobBids,
    doAcceptBid,
    doCreateAnnotation
} from "../../data/api";
import JobDetailPresentation from "./JobDetailPresentation";

class JobDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canAcceptBid: false,
            canCreateBid: false,
            jobDetail: null,
            bids: [],
            bidsLoading: true,
            showBidAcceptDialog: false,
            acceptBidDetails: null,
            hasError: false,
            jobAnnotations: []
        };

        this.handleAcceptBidClick = this.handleAcceptBidClick.bind(this);
        this.handleAcceptBidConfirm = this.handleAcceptBidConfirm.bind(this);
        this.handleCreateAnnotation = this.handleCreateAnnotation.bind(this);
        this.handleCreateAnnotationError = this.handleCreateAnnotationError.bind(
            this
        );
    }

    handleCreateAnnotationError(err) {
        const jobAnnotations = this.state.jobAnnotations.slice(0);
        const index = jobAnnotations.findIndex(
            annotation => annotation.id === "pending"
        );
        jobAnnotations.splice(index, 1);
        this.setState({
            jobAnnotations
        });

        toaster.danger(err.message);
    }

    handleCreateAnnotation(annotation) {
        const { jobDetail } = this.state;
        const jobAnnotations = this.state.jobAnnotations.slice(0);
        jobAnnotations.push({
            id: "pending",
            position_x: annotation.startOffset,
            position_y: annotation.endOffset,
            text: annotation.text
        });

        this.setState({
            jobAnnotations
        });

        doCreateAnnotation(jobDetail.id, {
            startOffset: annotation.startOffset,
            endOffset: annotation.endOffset,
            text: annotation.text
        })
            .then(() => {
                // no-op
            })
            .catch(this.handleCreateAnnotationError);
    }

    componentDidMount() {
        const {
            params: { id }
        } = this.props.computedMatch;

        doGetJobDetail(id)
            .then(body => {
                this.setState({
                    jobDetail: body.job,
                    jobAnnotations: body.job_anno,
                    canAcceptBid: body.job.Client.id === window.user.id,
                    canCreateBid: window.user.type === "freelancer"
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
                    jobAnnotations={this.state.jobAnnotations}
                    canAcceptBid={this.state.canAcceptBid}
                    canCreateBid={this.state.canCreateBid}
                    onAcceptBidClick={this.handleAcceptBidClick}
                    onCreateAnnotation={this.handleCreateAnnotation}
                    bidsLoading={this.state.bidsLoading}
                    bids={this.state.bids}
                />
            </>
        );
    }
}

export default JobDetail;
