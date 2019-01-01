import React from "react";
import { Pane, Heading, Combobox, Button, TextInput, Text, IconButton } from "evergreen-ui";
import { Paragraph } from "evergreen-ui/commonjs/typography";

function CrossButton(props) {
    return <IconButton onClick={props.onClick} icon="cross" height={20} style={{ display: "inline-flex", marginRight: 5 }}/>;
}

class FilterPane extends React.Component {
    constructor(props) {
        super(props);

        const {
            category,
            minPrice,
            maxPrice,
            minDuration,
            maxDuration
        } = props;

        this.state = {
            category,
            minPrice,
            maxPrice,
            minDuration,
            maxDuration
        };
    }
    /* eslint-disable no-mixed-operators */
    render() {
        const {
            category,
            minPrice,
            maxPrice,
            minDuration,
            maxDuration
        } = this.props;

        const hasFilterApplied = category || !!minPrice || !!maxPrice || !!minDuration || !!maxDuration;
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
                {hasFilterApplied && (
                    <Pane marginTop={30}>
                        <Heading size={400}>Applied filters</Heading>
                        {category && <Paragraph>∙ Category: {category} <CrossButton onClick={() => this.props.onRemoveFilter("category")}/></Paragraph>}
                {(!!minPrice || !!maxPrice) && <Paragraph>∙ Price range: {minPrice && [minPrice, <CrossButton key="btn" onClick={() => this.props.onRemoveFilter("minPrice")}/>] || 0}₺ - {maxPrice && [maxPrice, <CrossButton key="btn" onClick={() => this.props.onRemoveFilter("maxPrice")}/>] || "∞"}₺</Paragraph>}
                {(!!minDuration || !!maxDuration) && <Paragraph>∙ Est. Duration Range: {minDuration && [minDuration, <CrossButton key="btn" onClick={() => this.props.onRemoveFilter("minDuration")}/>] || 0} - {maxDuration && [maxDuration, <CrossButton key="btn" onClick={() => this.props.onRemoveFilter("maxDuration")}/>] || "∞"} days</Paragraph>}
                    </Pane>
                )}
                <Pane marginTop={30}>
                    <Heading is="h3" size={400}>Category</Heading>
                    <Combobox
                        width="100%"
                        marginTop={5}
                        items={['Banana', 'Orange', 'Apple', 'Mango']}
                        selectedItem={this.state.category}
                        onChange={selected => this.setState({ category: selected })}
                        placeholder="Categories"
                    />
                </Pane>
                <Pane marginTop={30}>
                    <Heading is="h3" size={400}>Price</Heading>
                    <Pane display="flex" alignItems="center" marginTop={5}>
                        <TextInput placeholder="min $" width="auto" value={this.state.minPrice} onChange={e => this.setState({ minPrice: e.target.value })}/>
                        <Text paddingX={5}> - </Text>
                        <TextInput placeholder="max $" width="auto" value={this.state.maxPrice} onChange={e => this.setState({ maxPrice: e.target.value })}/>
                    </Pane>
                </Pane>
                <Pane marginTop={30}>
                    <Heading is="h3" size={400}>Estimated duration</Heading>
                    <Pane display="flex" alignItems="center" marginTop={5}>
                        <TextInput placeholder="min days" type="number" width="auto" value={this.state.minDuration} onChange={e => this.setState({ minDuration: e.target.value })}/>
                        <Text paddingX={5}> - </Text>
                        <TextInput placeholder="max days" type="number" width="auto" value={this.state.maxDuration} onChange={e => this.setState({ maxDuration: e.target.value })}/>
                    </Pane>
                </Pane>
                <Button marginTop={30} width="100%" appearance="primary" intent="success" onClick={() => this.props.onApplyFilter(this.state)}>Apply filter</Button>
            </Pane>
        );
    }
}

export default FilterPane;