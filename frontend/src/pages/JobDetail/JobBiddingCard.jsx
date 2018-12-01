import React from "react";
import { Pane, Button, Heading, Paragraph } from "evergreen-ui";
import { Link } from "react-router-dom";

export default function JobBiddingCard(props) {
    const {
        name,
        description,
        userId,
        canAccept,
        onAcceptClick,
        amount,
        marginTop
    } = props;
    return (
        <Pane marginTop={marginTop}>
            <Pane display="flex" alignItems="center">
                <Heading size={500}>
                    <Link to={`/profile/${userId}`}>{name}</Link>
                </Heading>
                <Paragraph marginLeft="10px">•</Paragraph>
                <Heading size={500} marginLeft="10px">
                    {amount}₺
                </Heading>
                {canAccept && (
                    <>
                        <Paragraph marginLeft="10px">•</Paragraph>
                        <Button
                            marginLeft="10px"
                            iconBefore="tick"
                            intent="success"
                            onClick={onAcceptClick}>
                            Accept
                        </Button>
                    </>
                )}
            </Pane>
            <Paragraph marginTop="5px">{description}</Paragraph>
        </Pane>
    );
}
