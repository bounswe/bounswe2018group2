import React from "react";
import {
    Pane,
    Tablist,
    SidebarTab,
    Paragraph,
    Text,
    Table,
    Button,
    Heading
} from "evergreen-ui";
import imgclient from "./images.png";
import StarRatingComponent from "react-star-rating-component";
class ClientProfileArea extends React.Component {
    constructor() {
        super();
        this.state = { selectedIndex: 0 };
    }
    render() {
        return (
            <Pane background="tint1">
                <Pane background="#DDEBF7" padding={16}>
                    <Button
                        iconBefore="home"
                        height={30}
                        marginRight={16}
                        appearance="minimal"
                        intent="default">
                        Home Page
                    </Button>
                    <Button
                        iconBefore="envelope"
                        height={30}
                        marginRight={16}
                        appearance="minimal"
                        intent="default">
                        Messages
                    </Button>
                    <Button
                        iconBefore="mugshot"
                        height={30}
                        marginRight={16}
                        appearance="minimal"
                        intent="default">
                        My Profile
                    </Button>
                    <Button
                        iconBefore="log-out"
                        height={30}
                        marginRight={16}
                        appearance="minimal"
                        intent="default">
                        Log-out
                    </Button>
                </Pane>
                <Pane padding={16} background="tint1" display="flex">
                    <Pane>
                        <Pane
                            height={240}
                            width={200}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="default">
                            <br />
                            <img
                                src={imgclient}
                                alt="Profile"
                                height={240}
                                width={200}
                            />
                        </Pane>

                        <StarRatingComponent
                            name="Rating"
                            editing={false}
                            starCount={5}
                            value={4}
                        />

                        <Pane>
                            <Tablist
                                marginBottom={16}
                                flexBasis={240}
                                marginRight={24}>
                                <SidebarTab
                                    key="tab0"
                                    id="tab0"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 0 })
                                    }
                                    isSelected={0 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Homepage
                                </SidebarTab>

                                <SidebarTab
                                    key="tab1"
                                    id="tab1"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 1 })
                                    }
                                    isSelected={1 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Connections
                                </SidebarTab>

                                <SidebarTab
                                    key="tab2"
                                    id="tab2"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 2 })
                                    }
                                    isSelected={2 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Set Filters
                                </SidebarTab>

                                <SidebarTab
                                    key="tab3"
                                    id="tab3"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 3 })
                                    }
                                    isSelected={3 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Edit Profile
                                </SidebarTab>

                                <SidebarTab
                                    key="tab4"
                                    id="tab4"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 4 })
                                    }
                                    isSelected={4 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Skills
                                </SidebarTab>

                                <SidebarTab
                                    key="tab5"
                                    id="tab5"
                                    onSelect={() =>
                                        this.setState({ selectedIndex: 5 })
                                    }
                                    isSelected={5 === this.state.selectedIndex}
                                    aria-controls={`panel-$"tab1"`}>
                                    Delete Account
                                </SidebarTab>

                                <Button appearance="primary" marginTop={20}>
                                    {" "}
                                    START PROJECT!
                                </Button>
                            </Tablist>
                        </Pane>
                    </Pane>

                    <Pane padding={16} background="tint1" display="vertical">
                        <Pane
                            height={120}
                            width={1000}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            border="default">
                            <Text>
                                <Heading is="h3">
                                    İlber Tatlıcı, 55 Ankara{" "}
                                </Heading>
                                <Paragraph size={400} marginTop="default">
                                    Works in Finance sector. Is CEO of a
                                    company. Has 3 kids and 1 dog.
                                </Paragraph>
                            </Text>
                        </Pane>

                        <Table marginTop={20}>
                            <Table.Head>
                                <Table.TextHeaderCell>
                                    Freelancer
                                </Table.TextHeaderCell>
                                <Table.TextHeaderCell>
                                    Last Activity
                                </Table.TextHeaderCell>
                                <Table.TextHeaderCell>ltv</Table.TextHeaderCell>
                            </Table.Head>
                            <Table.Body height={240}>
                                <Table.Row intent="warning">
                                    <Table.TextCell>
                                        Jack Philips
                                    </Table.TextCell>
                                    <Table.TextCell>
                                        6 minutes ago
                                    </Table.TextCell>
                                    <Table.TextCell isNumber>
                                        $242
                                    </Table.TextCell>
                                </Table.Row>

                                <Table.Row intent="danger">
                                    <Table.TextCell>
                                        Julia Williamson
                                    </Table.TextCell>
                                    <Table.TextCell>
                                        10 minutes ago
                                    </Table.TextCell>
                                    <Table.TextCell isNumber>
                                        $242
                                    </Table.TextCell>
                                </Table.Row>

                                <Table.Row intent="success">
                                    <Table.TextCell>
                                        Jonathan Martin
                                    </Table.TextCell>
                                    <Table.TextCell>
                                        6 minutes ago
                                    </Table.TextCell>
                                    <Table.TextCell isNumber>
                                        $242
                                    </Table.TextCell>
                                </Table.Row>

                                <Table.Row intent="none">
                                    <Table.TextCell>
                                        Maria Bennett
                                    </Table.TextCell>
                                    <Table.TextCell>
                                        6 minutes ago
                                    </Table.TextCell>
                                    <Table.TextCell isNumber>
                                        $242
                                    </Table.TextCell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                        <Pane display="flex">
                            <Pane
                                key="tab0"
                                id={`panel-$"tab0"`}
                                role="tabpanel"
                                aria-labelledby="tab0"
                                aria-hidden={0 !== this.state.selectedIndex}
                                display={
                                    0 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph> </Paragraph>
                            </Pane>

                            <Pane
                                key="tab1"
                                id={`panel-$"tab1"`}
                                role="tabpanel"
                                aria-labelledby="tab1"
                                aria-hidden={1 !== this.state.selectedIndex}
                                display={
                                    1 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 1 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab2"
                                id={`panel-$"tab2"`}
                                role="tabpanel"
                                aria-labelledby="tab2"
                                aria-hidden={2 !== this.state.selectedIndex}
                                display={
                                    2 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 2 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab3"
                                id={`panel-$"tab3"`}
                                role="tabpanel"
                                aria-labelledby="tab3"
                                aria-hidden={3 !== this.state.selectedIndex}
                                display={
                                    3 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 3 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab4"
                                id={`panel-$"tab4"`}
                                role="tabpanel"
                                aria-labelledby="tab4"
                                aria-hidden={4 !== this.state.selectedIndex}
                                display={
                                    4 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 4 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab5"
                                id={`panel-$"tab5"`}
                                role="tabpanel"
                                aria-labelledby="tab5"
                                aria-hidden={5 !== this.state.selectedIndex}
                                display={
                                    5 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 5 </Paragraph>
                            </Pane>

                            <Pane
                                key="tab6"
                                id={`panel-$"tab6"`}
                                role="tabpanel"
                                aria-labelledby="tab6"
                                aria-hidden={6 !== this.state.selectedIndex}
                                display={
                                    6 === this.state.selectedIndex
                                        ? "block"
                                        : "none"
                                }>
                                <Paragraph>Panel Content 6 </Paragraph>
                            </Pane>
                        </Pane>
                    </Pane>
                </Pane>
            </Pane>
        );
    }
}

export default ClientProfileArea;
