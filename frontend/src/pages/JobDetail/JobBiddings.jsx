import React from "react";
import { Pane, Heading, Button } from "evergreen-ui";
import BidCreateDialog from "./BidCreateDialog";
import JobBiddingCard from "./JobBiddingCard";
import { doCreateBid } from "../../data/api";

class JobBiddings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false
        };
    }

    handleAddBidClick = params => {
        this.setState({
            isShown: false
        });

        let body = {
            description: params.bidDescription,
            price: params.bidPrice
        };

        doCreateBid(body).then(response => {
            response.json().then(body => {
                if (response.ok) {
                    console.log(response);
                }

                this.setState({
                    error: body.msg,
                    loading: false
                });
            });
        });
    };

    handleCloseClick = () => {
        this.setState({
            isShown: false
        });
    };

    render() {
        const { bids, canAcceptBid, onAcceptBidClick } = this.props;
        return (
            <>
                <Pane
                    overflowY="auto"
                    justifyContent="space-between"
                    flexDirection="column"
                    display="flex">
                    <Pane display="flex" alignItems="center">
                        <Heading size={600}>Biddings</Heading>
                        <Button
                            marginLeft="10px"
                            height={24}
                            onClick={() => this.setState({ isShown: true })}
                            appearance="primary"
                            intent="success">
                            Create Bid
                        </Button>
                    </Pane>
                    <Pane marginTop="20px">
                        {bids.map((bid, index) => {
                            const marginTop = index !== 0 ? 15 : null;
                            return (
                                <JobBiddingCard
                                    canAccept={canAcceptBid}
                                    onAcceptClick={onAcceptBidClick}
                                    marginTop={marginTop}
                                    userId={bid.userId}
                                    key={bid.id}
                                    name={bid.name}
                                    description={bid.description}
                                    amount={bid.amount}
                                />
                            );
                        })}
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
