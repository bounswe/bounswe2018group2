import React from "react";
import { Pane, Heading, Paragraph } from "evergreen-ui";

function Page404() {
    return (
        <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%">
            <Pane>
                <Heading size={700}>Nothing is found</Heading>
                <Paragraph marginTop="5px" size={700}>Or we didn't implement yet.</Paragraph>
            </Pane>
        </Pane>
    );
}

export default Page404;