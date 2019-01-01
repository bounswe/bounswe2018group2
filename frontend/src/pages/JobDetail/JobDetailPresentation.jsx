import React from "react";
import { Link } from "react-router-dom";
import { Pane, Icon, Spinner } from "evergreen-ui";
import JobDetailBody from "./JobDetailBody";
import JobDetailUser from "./JobDetailUser";
import JobBiddings from "./JobBiddings";
import JobUpdates from "./JobUpdates";

class JobDetailPresentation extends React.Component {
    render() {
        return (
            <Pane
                background="tint1"
                height="100%"
                paddingX="50px"
                paddingY="30px">
                <Link to="/">
                    <Pane display="flex" alignItems="center">
                        <Icon icon="chevron-left" size={20} />
                        Go to dashboard
                    </Pane>
                </Link>
                <Pane
                    display="flex"
                    justifyContent="center"
                    height="100%"
                    marginTop="10px"
                    paddingBottom="40px">
                    <Pane
                        flex="1"
                        borderRadius={5}
                        elevation={1}
                        background="white"
                        padding="24px"
                        width="100%"
                        height="280px">
                        <JobDetailUser
                            user={this.props.job && this.props.job.Client}
                        />
                    </Pane>
                    <Pane flex="5" display="flex" flexDirection="column">
                        <Pane
                            borderRadius={5}
                            elevation={1}
                            background="white"
                            marginLeft="20px"
                            padding="24px"
                            width="100%">
                            <JobDetailBody
                                job={this.props.job}
                                jobAnnotations={this.props.jobAnnotations}
                                canAcceptBid={this.props.canAcceptBid}
                                onCreateAnnotation={
                                    this.props.onCreateAnnotation
                                }
                            />
                        </Pane>
                        <Pane
                            borderRadius={5}
                            elevation={1}
                            background="white"
                            marginTop="20px"
                            marginLeft="20px"
                            marginBottom="20px"
                            padding="24px"
                            width="100%">
                            {!this.props.job && (
                                <Pane
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center">
                                    <Spinner />
                                </Pane>
                            )}
                            {this.props.job &&
                                this.props.job.bidding_status === "open" && (
                                    <JobBiddings
                                        jobId={this.props.job.id}
                                        bidsLoading={this.props.bidsLoading}
                                        bids={this.props.bids}
                                        canAcceptBid={this.props.canAcceptBid}
                                        canCreateBid={this.props.canCreateBid}
                                        onAcceptBidClick={
                                            this.props.onAcceptBidClick
                                        }
                                    />
                                )}
                            {this.props.job &&
                                this.props.job.bidding_status === "closed" && (
                                    <JobUpdates
                                        job={this.props.job}
                                        onCompleteJob={this.props.onCompleteJob}
                                        onRequestUpdate={this.props.onRequestUpdate}
                                        onCreateUpdate={this.props.onCreateUpdate}/>
                                )}
                        </Pane>
                    </Pane>
                </Pane>
            </Pane>
        );
    }
}

export default JobDetailPresentation;
