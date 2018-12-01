import React from "react";
import { Pane, Heading, Paragraph } from "evergreen-ui";
import { Link } from "react-router-dom";

export default function JobBiddingCard(props) {
    const { name, description, userId, amount, marginTop } = props;
    return (
        <Pane marginTop={marginTop}>
            <Pane display="flex">
                <Heading size={400}>
                    <Link to={`/profile/${userId}`}>{name}</Link>
                </Heading>
                <Paragraph marginLeft="10px">•</Paragraph>
                <Heading size={400} marginLeft="10px">
                    {amount}₺
                </Heading>
            </Pane>
            <Paragraph>{description}</Paragraph>
        </Pane>
    );
}
