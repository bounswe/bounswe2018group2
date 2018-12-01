import React from "react";
import { Pane, Button, Heading, Paragraph } from "evergreen-ui";
import { Link } from "react-router-dom";

export default class JobBiddingCard extends React.Component {
    constructor(props) {
        super(props);

        this.handleAcceptClick = this.handleAcceptClick.bind(this);
    }

    handleAcceptClick() {
        const { bidId, name, description, amount, onAcceptClick } = this.props;
        onAcceptClick({
            bidId,
            name,
            description,
            amount
        });
    }

    render() {
        const {
            name,
            description,
            userId,
            canAccept,
            amount,
            marginTop
        } = this.props;
        return (
            <Pane marginTop={marginTop}>
                <Pane display="flex" alignItems="center">
                    <Heading size={500}>
                        <Link to={`/profile/${userId}`}>{name}</Link>
                    </Heading>
                    <Paragraph marginLeft="5px">•</Paragraph>
                    <Heading size={500} marginLeft="5px">
                        {amount}₺
                    </Heading>
                    {canAccept && (
                        <>
                            <Paragraph marginLeft="5px">•</Paragraph>
                            <Button
                                marginLeft="5px"
                                iconBefore="tick"
                                intent="success"
                                onClick={this.handleAcceptClick}>
                                Accept
                            </Button>
                        </>
                    )}
                </Pane>
                <Paragraph marginTop="5px">{description}</Paragraph>
            </Pane>
        );
    }
}
