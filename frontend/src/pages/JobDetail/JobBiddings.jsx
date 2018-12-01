import React from "react";
import { Pane, Heading } from "evergreen-ui";
import JobBiddingCard from "./JobBiddingCard";

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

class JobBiddings extends React.Component {
    render() {
        return (
            <Pane overflowY="auto">
                <Heading size={600}>Biddings</Heading>
                <Pane marginTop="20px">
                    {bids.map((bid, index) => {
                        const marginTop = index !== 0 ? 15 : null;
                        return (
                            <JobBiddingCard
                                canAccept={true}
                                onAcceptClick={() =>
                                    console.log("clicked accept")
                                }
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
}

export default JobBiddings;
