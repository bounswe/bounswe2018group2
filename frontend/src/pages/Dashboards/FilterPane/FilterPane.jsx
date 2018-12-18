import React from "react";
import { Pane, Heading, Combobox, Button, TextInput, Text } from "evergreen-ui";
import { Paragraph } from "evergreen-ui/commonjs/typography";

class FilterPane extends React.Component {
    render() {
        return (
            <Pane
                flex="1"
                background="white"
                marginLeft={40}
                paddingTop={30}
                padding={20}
                border="default"
                style={{ flexBasis: "25%", position: "sticky", top: 0, height: "min-content" }}>
                <Heading size={600}>Filter</Heading>
                <Pane marginTop={30}>
                    <Heading size={400}>Applied filters</Heading>
                    <Paragraph>∙ Category: Web Development</Paragraph>
                    <Paragraph>∙ Price range: 100₺ - 500₺</Paragraph>
                    <Paragraph>∙ Est. Duration Range: 5 - 10 days</Paragraph>
                </Pane>
                <Pane marginTop={30}>
                    <Heading is="h3" size={400}>Category</Heading>
                    <Combobox
                        width="100%"
                        marginTop={5}
                        items={['Banana', 'Orange', 'Apple', 'Mango']}
                        onChange={selected => console.log(selected)}
                        placeholder="Categories"
                    />
                </Pane>
                <Pane marginTop={30}>
                    <Heading is="h3" size={400}>Price</Heading>
                    <Pane display="flex" alignItems="center" marginTop={5}>
                        <TextInput placeholder="min $" width="auto"/>
                        <Text paddingX={5}> - </Text>
                        <TextInput placeholder="max $" width="auto"/>
                    </Pane>
                </Pane>
                <Pane marginTop={30}>
                    <Heading is="h3" size={400}>Estimated duration</Heading>
                    <Pane display="flex" alignItems="center" marginTop={5}>
                        <TextInput placeholder="min days" type="number" width="auto"/>
                        <Text paddingX={5}> - </Text>
                        <TextInput placeholder="max days" type="number" width="auto"/>
                    </Pane>
                </Pane>
                <Button marginTop={30} width="100%" appearance="primary" intent="success">Apply filter</Button>
            </Pane>
        );
    }
}

export default FilterPane;