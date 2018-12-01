import React from "react";
import { Pane, Heading } from "evergreen-ui";
import JobBiddingCard from "./JobBiddingCard";

function JobBiddings(props) {
    const { bids, canAcceptBid, onAcceptBidClick } = props;
    return (
        <Pane overflowY="auto">
            <Heading size={600}>Biddings</Heading>
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
    );
}

export default JobBiddings;
