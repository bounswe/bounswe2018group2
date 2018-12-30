import React from "react";
import { Pane, Card, Paragraph, Heading, Strong, Spinner, IconButton, Button, Textarea, Label } from "evergreen-ui";
import debounce from "lodash.debounce";

const options = { year: "numeric", month: "long", day: "numeric" };
const dateFormatter = new Intl.DateTimeFormat("en-EN", options);

class AnnotationPane extends React.Component {
    render() {
        return (
            <Pane position="absolute" style={{ top: this.props.top, left: this.props.left }}>
                {this.props.children}
            </Pane>
        )
    }
}

class JobDetailBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowSelection: null,
            selection: null,
            annotationRect: null,
            addingAnnotation: false,
            annotationText: ""
        };

        this.handleSelectionChange = debounce(this.handleSelectionChange).bind(this);
        this.handleDescriptionRef = this.handleDescriptionRef.bind(this);
        this.handleWindowClick = this.handleWindowClick.bind(this);
    }

    handleSelectionChange() {
        const windowSelection = window.getSelection();
        if (windowSelection.isCollapsed) {
            this.setState({
                windowSelection: null
            });
            return;
        }

        if (windowSelection.focusNode.nodeType !== Node.TEXT_NODE) {
            this.setState({
                windowSelection: null
            });
            return;
        }

        if (!this.descriptionEl.contains(windowSelection.focusNode)) {
            this.setState({
                windowSelection: null
            });
            return;
        }

        const range = windowSelection.getRangeAt(0);
        this.setState({
            windowSelection: {
                startOffset: range.startOffset,
                endOffset: range.endOffset,
                text: windowSelection.toString(),
                rect: range.getBoundingClientRect()
            }
        });
    }

    handleWindowClick() {
        this.setState({
            selection: null
        });
    }

    componentDidMount() {
        document.addEventListener(
            "selectionchange",
            this.handleSelectionChange
        );
        window.addEventListener("click", this.handleWindowClick);
    }

    componentWillUnmount() {
        document.removeEventListener(
            "selectionchange",
            this.handleSelectionChange
        );
        window.removeEventListener("click", this.handleWindowClick);
    }

    handleDescriptionRef(el) {
        this.descriptionEl = el;
    }

    render() {
        const { windowSelection, selection } = this.state;

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
                {selection && (
                    <>
                        <Pane position="absolute" top={selection.rect.top} left={selection.rect.left} width={selection.rect.width} height={16} style={{ backgroundColor: "rgba(0, 255, 0, 0.2)"}}>
                        </Pane>
                        <AnnotationPane top={selection.rect.bottom} left={selection.rect.right + 10}>
                            <Card onClickCapture={ev => ev.stopPropagation()} elevation={2} zIndex={100} padding={15} width={320} background="white">
                                <Label
                                    htmlFor="textarea-2"
                                    marginBottom={4}
                                    display="block">
                                    Adding annotation
                                </Label>
                                <Textarea
                                    id="textarea-2"
                                    placeholder={`Add a descriptive annotation for "${selection.text}"`}/>
                                <Button marginTop={5}>Add annotation</Button>
                            </Card>
                        </AnnotationPane>
                    </>
                )}
                {windowSelection && !selection && (
                    <AnnotationPane left={windowSelection.rect.right}>
                        <IconButton onClickCapture={(ev) => { ev.stopPropagation();  this.setState(state => { return { addingAnnotation: true, selection: state.windowSelection } })}} icon="annotation"/>
                    </AnnotationPane>
                )}
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
