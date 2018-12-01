import React from "react";
import {
    Pane,
    Heading,
    Button,
    Paragraph,
    Spinner,
    toaster
} from "evergreen-ui";
import BidCreateDialog from "./BidCreateDialog";
import JobBiddingCard from "./JobBiddingCard";
import { doCreateBid } from "../../data/api";

class JobBiddings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            addedBids: []
        };
    }

    handleAddBidClick = params => {
        const { jobId } = this.props;

        this.setState(state => ({
            isShown: false,
            addedBids: [
                ...state.addedBids,
                {
                    id: "added",
                    freelancer_id: window.user.id,
                    description: params.bidDescription,
                    amount: params.bidPrice,
                    Freelancer: {
                        firstName: window.user.firstName,
                        lastName: window.user.lastName
                    }
                }
            ]
        }));

        doCreateBid(jobId, params.bidDescription, params.bidPrice).catch(
            err => {
                toaster.danger(err.message);

                this.setState(state => {
                    const oldBids = state.addedBids.splice();
                    oldBids.pop();

                    return {
                        addedBids: oldBids
                    };
                });
            }
        );
    };

    handleCloseClick = () => {
        this.setState({
            isShown: false
        });
    };

    render() {
        const {
            bids,
            bidsLoading,
            canAcceptBid,
            onAcceptBidClick
        } = this.props;
        const processedBids = bids.concat(this.state.addedBids);
        return (
            <>
                <Pane
                    overflowY="auto"
                    justifyContent="space-between"
                    flexDirection="column"
                    display="flex">
                    <Pane display="flex" alignItems="center">
                        <Heading size={600}>Biddings</Heading>
                        {!canAcceptBid && (
                            <Button
                                marginLeft="10px"
                                height={24}
                                onClick={() => this.setState({ isShown: true })}
                                appearance="primary"
                                intent="success">
                                Create Bid
                            </Button>
                        )}
                    </Pane>
                    <Pane marginTop="20px">
                        {!!processedBids.length &&
                            processedBids
                                .sort((bid1, bid2) => bid2.amount - bid1.amount)
                                .map((bid, index) => {
                                    const marginTop = index !== 0 ? 15 : null;
                                    return (
                                        <JobBiddingCard
                                            canAccept={canAcceptBid}
                                            onAcceptClick={onAcceptBidClick}
                                            marginTop={marginTop}
                                            userId={bid.freelancer_id}
                                            key={bid.id}
                                            name={`${
                                                bid.Freelancer.firstName
                                            } ${bid.Freelancer.lastName}`}
                                            description={bid.description}
                                            amount={bid.amount}
                                        />
                                    );
                                })}
                        {!processedBids.length &&
                            !bidsLoading && (
                                <Paragraph>
                                    How hard is this job? No one made a bid
                                    yet... 😅
                                </Paragraph>
                            )}
                        {bidsLoading && <Spinner />}
                    </Pane>
                </Pane>
                {this.state.isShown && (
                    <BidCreateDialog
                        onBidClick={this.handleAddBidClick}
                        onClose={this.handleCloseClick}
                    />
                )}
            </>
        );
    }
}

export default JobBiddings;
