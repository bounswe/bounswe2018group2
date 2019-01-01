import React from "react";
import {
    Dialog,
    TextInputField,
    Label,
    Textarea,
    Paragraph,
    Code
} from "evergreen-ui";

class BidCreateDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bidPrice: "",
            bidDescription: ""
        };
    }

    render() {
        return (
            <Dialog
                isShown={true}
                bid={this.state.bid}
                title="Create Bid"
                confirmLabel="BID"
                onCloseComplete={this.props.onClose}
                onConfirm={() =>
                    this.props.onBidClick({
                        bidPrice: this.state.bidPrice,
                        bidDescription: this.state.bidDescription
                    })
                }>
                <TextInputField
                    label="Bid Price"
                    type="number"
                    value={this.state.bidPrice}
                    onChange={event =>
                        this.setState({ bidPrice: event.target.value })
                    }
                    marginBottom={16}
                    placeholder="Price in ₺"
                />
                <Label
                    htmlFor="bid-description"
                    marginBottom={4}
                    display="block">
                    Bid Description
                </Label>
                <Textarea
                    id="bid-descriotion"
                    name="bid-description"
                    placeholder="Bid description."
                    value={this.state.bidDescription}
                    onChange={event =>
                        this.setState({ bidDescription: event.target.value })
                    }
                />
                <Paragraph marginTop={4} size={300}>
                    Hint: You can add links with writing{" "}
                    <Code size={300}>[link text](http://ergun.sh)</Code>
                </Paragraph>
            </Dialog>
        );
    }
}

export default BidCreateDialog;
