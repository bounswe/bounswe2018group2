import {
    Pane,
    SelectMenu,
    Button,
    Heading,
    TextInputField,
    Textarea,
    Checkbox,
    Label,
    Paragraph,
    toaster
} from "evergreen-ui";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router-dom";
import DayPicker from "react-day-picker";
import { toBase64 } from "../../utils/utils";
import "react-day-picker/lib/style.css";
import React from "react";
import { doCreateJob, doUpload } from "../../data/api";
import { Code } from "evergreen-ui/commonjs/typography";

const dateFormatter = new Intl.DateTimeFormat("en-US");

function waitingFilesToText(files) {
    return files.reduce(
        (prev, file) => `${prev} ![${file.name}](Uploading…)`,
        ""
    );
}

class CreateJob extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            price: "",
            duration: "",
            submitLoading: false,
            creatdJobID: null,
            datePickerShown: false,
            selectedCategories: [],
            hasDueDate: false,
            dueDate: null
        };
    }

    handleDaySelect = day => {
        this.setState({
            dueDate: day,
            datePickerShown: false
        });
    };

    handleCreateJob = () => {
        const {
            title,
            description,
            price,
            duration,
            selectedCategories,
            dueDate
        } = this.state;

        const reqBody = {
            client_id: window.user.id,
            header: title,
            description,
            due_date: dueDate,
            price,
            categories: selectedCategories.map(category => category.value),
            duration
        };

        this.setState({
            submitLoading: true
        });

        doCreateJob(reqBody)
            .then(resp => {
                this.setState({
                    submitLoading: false,
                    createdJobID: resp.id
                });

                toaster.success("Job created successfully");
            })
            .catch(e => {
                this.setState({
                    submitLoading: false,
                    createdJobID: null
                });
                toaster.danger(e.message);
            });
    };

    handleDrop = acceptedFiles => {
        acceptedFiles.forEach(file => {
            this.setState(state => {
                return {
                    description:
                        state.description + waitingFilesToText(acceptedFiles)
                };
            });

            return toBase64(file)
                .then(base64File => doUpload(base64File, file.name))
                .then(result => {
                    this.setState(state => {
                        const { url } = result;
                        return {
                            description: state.description.replace(
                                `![${file.name}](Uploading…)`,
                                `![${file.name}](${url})`
                            )
                        };
                    });
                })
                .catch(e => {
                    console.error(e);
                    toaster.danger(e.msg);
                    this.setState(state => {
                        return {
                            description: state.description.replace(
                                `![${file.name}](Uploading…)`,
                                ""
                            )
                        };
                    });
                });
        });
    };

    formatDueDate() {
        const { dueDate } = this.state;
        return dateFormatter.format(dueDate);
    }

    render() {
        if (this.state.createdJobID) {
            return <Redirect to={`/job/${this.state.createdJobID}`} />;
        }
        return (
            <Pane
                background="tint1"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Pane
                    borderRadius={5}
                    elevation={1}
                    background="white"
                    padding="24px"
                    width="620px">
                    <Heading size={600}>Create new job</Heading>
                    <Pane marginTop={20}>
                        <TextInputField
                            name="Title"
                            value={this.state.title}
                            onChange={e =>
                                this.setState({ title: e.target.value })
                            }
                            type="text"
                            required
                            label="Title"
                            placeholder="A good, attractive job title"
                        />
                        <Label
                            htmlFor="Description"
                            marginBottom={4}
                            display="block">
                            Description
                        </Label>
                        <Dropzone onDrop={this.handleDrop}>
                            {({ getRootProps, isDragActive }) => {
                                return (
                                    <div
                                        {...getRootProps()}
                                        style={{ position: "relative" }}
                                        tabIndex="-1">
                                        {isDragActive && (
                                            <Pane
                                                position="absolute"
                                                width="100%"
                                                height="100%"
                                                top={0}
                                                left={0}
                                                background="rgba(0, 0, 0, 0.2)"
                                                border="2px solid #000000"
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center">
                                                Drop here
                                            </Pane>
                                        )}
                                        <Pane>
                                            <Textarea
                                                name="Description"
                                                value={this.state.description}
                                                onChange={e =>
                                                    this.setState({
                                                        description:
                                                            e.target.value
                                                    })
                                                }
                                                type="text"
                                                required
                                                label="Description"
                                                placeholder="A clear description"
                                            />
                                        </Pane>
                                    </div>
                                );
                            }}
                        </Dropzone>
                        <Paragraph marginTop={4} size={300}>
                            Hint: You can add images with dropping into text
                            area or writing{" "}
                            <Code size={300}>
                                ![image's alt text](http://placekitten.com/120)
                            </Code>{" "}
                            and links with writing{" "}
                            <Code size={300}>[link text](http://ergun.sh)</Code>
                        </Paragraph>
                        <Pane display="flex" alignItems="center" marginTop={12}>
                            <TextInputField
                                flex="1"
                                name="Price in ₺"
                                type="number"
                                required
                                value={this.state.price}
                                onChange={e =>
                                    this.setState({ price: e.target.value })
                                }
                                label="Price"
                                marginBottom={0}
                                placeholder="Price in ₺"
                            />
                            <Pane
                                display="flex"
                                flex="1"
                                paddingLeft={15}
                                justifyContent="flex-end"
                                alignItems="flex-end">
                                <SelectMenu
                                    isMultiSelect
                                    height={300}
                                    width={180}
                                    hasTitle={true}
                                    hasFilter={true}
                                    title="Select category"
                                    options={Object.keys(window.categories).map(
                                        key => {
                                            const category =
                                                window.categories[key];
                                            return {
                                                label: category.name,
                                                value: category.id
                                            };
                                        }
                                    )}
                                    selected={this.state.selectedCategories.map(
                                        category => category.value
                                    )}
                                    onSelect={item =>
                                        this.setState(state => {
                                            const {
                                                selectedCategories
                                            } = state;
                                            selectedCategories.push(item);
                                            return {
                                                selectedCategories
                                            };
                                        })
                                    }
                                    onDeselect={item => {
                                        this.setState(state => {
                                            let { selectedCategories } = state;
                                            selectedCategories.splice(
                                                selectedCategories.findIndex(
                                                    val =>
                                                        val.value === item.value
                                                ),
                                                1
                                            );
                                            return {
                                                selectedCategories
                                            };
                                        });
                                    }}>
                                    <Button>
                                        {this.state.selectedCategories.length
                                            ? this.state.selectedCategories.reduce(
                                                  (prev, category) =>
                                                      prev +
                                                      category.label +
                                                      ", ",
                                                  ""
                                              )
                                            : "Select category..."}
                                    </Button>
                                </SelectMenu>
                            </Pane>
                        </Pane>
                        <TextInputField
                            width="50%"
                            marginTop={12}
                            flex="1"
                            name="ExpectedDuration"
                            type="number"
                            value={this.state.duration}
                            onChange={e =>
                                this.setState({ duration: e.target.value })
                            }
                            required
                            label="Expected duration in days"
                            marginBottom={16}
                            placeholder="Duration in days"
                        />
                        <Pane display="flex" justifyContent="space-between">
                            <Checkbox
                                label={`Has due date${
                                    this.state.dueDate
                                        ? ": " + this.formatDueDate()
                                        : ""
                                }`}
                                checked={this.state.hasDueDate}
                                onChange={e =>
                                    this.setState({
                                        hasDueDate: e.target.checked,
                                        datePickerShown: e.target.checked
                                    })
                                }
                            />
                            {this.state.datePickerShown && (
                                <Pane
                                    position="absolute"
                                    background="white"
                                    elevation={2}
                                    marginLeft="-20px">
                                    <DayPicker
                                        onDayClick={this.handleDaySelect}
                                        selectedDays={this.state.dueDate}
                                    />
                                </Pane>
                            )}
                            <Button
                                appearance="primary"
                                isLoading={this.state.submitLoading}
                                onClick={this.handleCreateJob}>
                                Create job
                            </Button>
                        </Pane>
                    </Pane>
                </Pane>
            </Pane>
        );
    }
}

export default CreateJob;
