import React from "react";
import { Pane, Paragraph, Heading, Strong, Spinner } from "evergreen-ui";

const options = { year: "numeric", month: "long", day: "numeric" };
const dateFormatter = new Intl.DateTimeFormat("en-EN", options);

class JobDetailBody extends React.Component {
    render() {
        const { job } = this.props;
        if (!job) {
            return (
                <Pane display="flex" justifyContent="center">
                    <Spinner />
                </Pane>
            );
        }
        const dueTime = typeof job.duedate === "string" ? new Date(job.duedate) : job.duedate;
        return (
            <Pane overflowY="auto">
                <Heading size={600}>{job.header}</Heading>
                <Paragraph marginTop="3px" size={300}>
                    Last updated at{" "}
                    <Strong size={300}>
                        {dateFormatter.format(new Date(job.updatedAt))}
                    </Strong>
                </Paragraph>
                <Paragraph marginTop="10px">{job.description}</Paragraph>
                <Paragraph marginTop="15px">
                    Price: <Strong>{job.price}₺</Strong>
                    <br />
                    Estimated duration: <Strong>{job.duration} days</Strong>
                    <br />
                    {job.duedate && (
                        <>
                            Due date:{" "}
                            <Strong>{dateFormatter.format(dueTime)}</Strong>
                        </>
                    )}
                </Paragraph>
                <Paragraph marginTop="5px">
                    {/* <Badge isSolid color="green">
                        Article Writing
                    </Badge>{" "}
                    <Badge isSolid color="yellow">
                        Finansal Araştırma
                    </Badge>{" "}
                    <Badge isSolid color="orange">
                        Grafik Tasarımı
                    </Badge>{" "}
                    <Badge isSolid color="purple">
                        HTML
                    </Badge> */}
                </Paragraph>
            </Pane>
        );
    }
}

export default JobDetailBody;
