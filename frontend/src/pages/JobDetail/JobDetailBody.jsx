import React from "react";
import {
    Pane,
    Card,
    Paragraph,
    Heading,
    Strong,
    Spinner,
    IconButton,
    Button,
    Textarea,
    Label
} from "evergreen-ui";
import debounce from "lodash.debounce";
import RichTextFragment from "../../utils/RichTextFragment";

const options = { year: "numeric", month: "long", day: "numeric" };
const dateFormatter = new Intl.DateTimeFormat("en-EN", options);

function selectRange(el, start, end) {
    try {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(el, start);
        range.setEnd(el, end);
        selection.removeAllRanges();
        selection.addRange(range);
    } catch (e) {
        // no-op
        console.log("e", e);
    }
}

class AnnotationPane extends React.Component {
    render() {
        return (
            <Pane
                position="absolute"
                style={{ top: this.props.top, left: this.props.left }}>
                {this.props.children}
            </Pane>
        );
    }
}

class JobDetailBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowSelection: null,
            annotationText: "",
            annotations: [],
            selection: null
        };

        this.handleSelectionChange = debounce(this.handleSelectionChange).bind(
            this
        );
        this.handleDescriptionRef = this.handleDescriptionRef.bind(this);
        this.handleWindowClick = this.handleWindowClick.bind(this);
        this.handleCreateAnnotation = this.handleCreateAnnotation.bind(this);
    }

    handleSelectionChange() {
        const { canAcceptBid } = this.props;
        if (!canAcceptBid) {
            return;
        }

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
            selection: null,
            annotationText: ""
        });
    }

    handleCreateAnnotation() {
        const { selection, annotationText } = this.state;
        this.props.onCreateAnnotation({
            startOffset: selection.startOffset,
            endOffset: selection.endOffset,
            text: annotationText
        });

        this.setState({
            selection: null,
            annotationText: ""
        });
    }

    createSelectionRects() {
        const { jobAnnotations } = this.props;

        const annotations = jobAnnotations.map(annotation => {
            selectRange(
                this.descriptionEl.firstChild,
                annotation.position_x,
                annotation.position_y
            );
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            return {
                id: annotation.id,
                rect: range.getBoundingClientRect(),
                text: annotation.text
            };
        });

        this.setState({
            annotations
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

    componentDidUpdate(prevProps, _) {
        if (this.props.jobAnnotations !== prevProps.jobAnnotations) {
            this.createSelectionRects();
            window.getSelection().removeAllRanges();
        }
    }

    handleDescriptionRef(el) {
        this.descriptionEl = el;
    }

    render() {
        const {
            windowSelection,
            selection,
            shownAnnotation,
            annotations
        } = this.state;
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
                {annotations &&
                    annotations.map(annotation => {
                        return (
                            <Pane
                                position="absolute"
                                key={annotation.id}
                                top={annotation.rect.top}
                                left={annotation.rect.left}
                                width={annotation.rect.width}
                                onMouseOver={ev =>
                                    this.setState({
                                        shownAnnotation: {
                                            text: annotation.text,
                                            rect: ev.target.getBoundingClientRect()
                                        }
                                    })
                                }
                                onMouseOut={() =>
                                    this.setState({ shownAnnotation: null })
                                }
                                height="20px"
                                style={{ background: "rgba(0, 0, 0, 0.1)" }}
                            />
                        );
                    })}
                {shownAnnotation && (
                    <Pane
                        position="absolute"
                        top={shownAnnotation.rect.top}
                        left={shownAnnotation.rect.right}
                        maxWidth={320}
                        background="white"
                        elevation={2}
                        padding={20}>
                        <Paragraph>{shownAnnotation.text}</Paragraph>
                    </Pane>
                )}
                {selection && (
                    <>
                        <Pane
                            position="absolute"
                            top={selection.rect.top}
                            left={selection.rect.left}
                            width={selection.rect.width}
                            height={16}
                            style={{ backgroundColor: "rgba(0, 255, 0, 0.2)" }}
                        />
                        <AnnotationPane
                            top={selection.rect.bottom}
                            left={selection.rect.right + 5}>
                            <Card
                                onClick={ev => ev.stopPropagation()}
                                elevation={2}
                                zIndex={100}
                                padding={15}
                                width={320}
                                background="white">
                                <Label
                                    htmlFor="textarea-2"
                                    marginBottom={4}
                                    display="block">
                                    Adding annotation
                                </Label>
                                <Textarea
                                    id="textarea-2"
                                    onChange={ev =>
                                        this.setState({
                                            annotationText: ev.target.value
                                        })
                                    }
                                    value={this.state.annotationText}
                                    placeholder={`Add a descriptive annotation for "${
                                        selection.text
                                    }"`}
                                />
                                <Button
                                    marginTop={5}
                                    onClick={this.handleCreateAnnotation}>
                                    Add annotation
                                </Button>
                            </Card>
                        </AnnotationPane>
                    </>
                )}
                {windowSelection &&
                    !selection && (
                        <AnnotationPane left={windowSelection.rect.right}>
                            <IconButton
                                onClickCapture={ev => {
                                    ev.stopPropagation();
                                    this.setState(state => {
                                        return {
                                            selection: state.windowSelection
                                        };
                                    });
                                }}
                                icon="annotation"
                            />
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
                        <RichTextFragment class="richTextSpan">
                            {job.description}
                        </RichTextFragment>
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

JobDetailBody.defaultProps = {
    jobAnnotations: []
};

export default JobDetailBody;
