import {
    Pane,
    SelectMenu,
    Button,
    Heading,
    TextInputField,
    Textarea,
    Checkbox,
    Label
} from "evergreen-ui";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import React from "react";
import { doCreateJob } from "../../data/api";

const dateFormatter = new Intl.DateTimeFormat("en-US");

const categories = [
    {
        name: "Apple",
        value: 0
    },
    {
        name: "Orange",
        value: 1
    },
    {
        name: "Camiryo",
        value: 2
    }
];

class CreateJob extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            price: 0,
            duration: 0,
            category: 0,
            datePickerShown: false,
            selectedCategory: null,
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
            category,
            dueDate
        } = this.state;

        const reqBody = {
            client_id: window.user.id,
            header: title,
            description,
            due_date: dueDate,
            price,
            categories: [category],
            duration
        };

        doCreateJob(reqBody)
            .then(resp => {
                console.log("job must be created");
                console.log("here is the response", resp);
            })
            .catch(console.error);
    };

    formatDueDate() {
        const { dueDate } = this.state;
        return dateFormatter.format(dueDate);
    }

    render() {
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
                        <Textarea
                            name="Description"
                            value={this.state.description}
                            onChange={e =>
                                this.setState({ description: e.target.value })
                            }
                            type="text"
                            required
                            label="Description"
                            placeholder="A clear description"
                        />
                        <Pane display="flex" alignItems="center" marginTop={12}>
                            <TextInputField
                                flex="1"
                                name="Price"
                                type="number"
                                required
                                value={this.state.price}
                                onChange={e =>
                                    this.setState({ price: e.target.value })
                                }
                                label="Price"
                                marginBottom={0}
                                placeholder="Price in try"
                            />
                            <Pane
                                display="flex"
                                flex="1"
                                justifyContent="flex-end"
                                alignItems="flex-end">
                                <SelectMenu
                                    height={300}
                                    width={180}
                                    hasTitle={true}
                                    hasFilter={true}
                                    title="Select category"
                                    options={categories.map(category => ({
                                        label: category.name,
                                        value: category.value
                                    }))}
                                    selected={
                                        this.state.selectedCategory &&
                                        this.state.selectedCategory.name
                                    }
                                    onSelect={item =>
                                        this.setState({
                                            selectedCategory: {
                                                name: item.label,
                                                value: item.value
                                            }
                                        })
                                    }>
                                    <Button>
                                        {this.state.selectedCategory
                                            ? this.state.selectedCategory.name
                                            : "Select category..."}
                                    </Button>
                                </SelectMenu>
                            </Pane>
                        </Pane>
                        <TextInputField
                            width="50%"
                            marginTop={12}
                            flex="1"
                            name="Duration"
                            type="number"
                            value={this.state.duration}
                            onChange={e =>
                                this.setState({ duration: e.target.value })
                            }
                            required
                            label="Duration"
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
