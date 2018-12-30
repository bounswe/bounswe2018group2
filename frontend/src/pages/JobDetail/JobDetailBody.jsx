import React from "react";
import { Pane, Paragraph, Heading, Strong, Spinner } from "evergreen-ui";

const options = { year: "numeric", month: "long", day: "numeric" };
const dateFormatter = new Intl.DateTimeFormat("en-EN", options);

class JobDetailBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selection: null
        };
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleDescriptionRef = this.handleDescriptionRef.bind(this);
    }

    handleSelectionChange() {
        const selection = window.getSelection();
        if (selection.isCollapsed) {
            this.setState({
                selection: null
            });
            return;
        }

        if (selection.focusNode.nodeType !== Node.TEXT_NODE) {
            this.setState({
                selection: null
            });
            return;
        }

        if (!this.descriptionEl.contains(selection.focusNode)) {
            this.setState({
                selection: null
            });
            return;
        }

        const range = selection.getRangeAt(0);
        this.setState({
            selection: {
                startOffset: range.startOffset,
                endOffset: range.endOffset
            }
        });
    }

    componentDidMount() {
        document.addEventListener(
            "selectionchange",
            this.handleSelectionChange
        );
    }

    componentWillUnmount() {
        document.removeEventListener(
            "selectionchange",
            this.handleSelectionChange
        );
    }

    handleDescriptionRef(el) {
        this.descriptionEl = el;
    }

    render() {
        const { selection } = this.state;
        const { job } = this.props;
        if (!job) {
            return (
                <Pane display="flex" justifyContent="center">
                    <Spinner />
                </Pane>
            );
        }
        const dueTime =
            typeof job.duedate === "string"
                ? new Date(job.duedate)
                : job.duedate;
        return (
            <Pane overflowY="auto">
                <Heading size={600}>{job.header}</Heading>
                <Paragraph marginTop="3px" size={300}>
                    Last updated at{" "}
                    <Strong size={300}>
                        {dateFormatter.format(new Date(job.updatedAt))}
                    </Strong>
                </Paragraph>
                <Paragraph marginTop="10px">
                    <span ref={this.handleDescriptionRef}>
                        {job.description}
                    </span>
                </Paragraph>
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
