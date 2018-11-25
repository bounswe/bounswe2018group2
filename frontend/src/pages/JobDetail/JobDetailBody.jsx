import React from "react";
import {
    Pane,
    Paragraph,
    Heading,
    Strong,
    Text,
    Badge
} from "evergreen-ui";

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const dateFormatter = new Intl.DateTimeFormat("en-EN", options);

const title = "This is the title of the job";
const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac erat tempus, semper enim ac, lacinia nulla. Sed vel velit ornare, tempor turpis nec, tincidunt mi. Phasellus ut congue metus, vel dignissim turpis. In molestie, dolor ut porttitor mollis, felis urna condimentum leo, et tempus felis nisl eget lectus. Nam sodales tortor id sapien semper, aliquet pretium mauris consectetur. Aliquam vel mi erat. Morbi ullamcorper at massa id pellentesque. Sed quis sagittis risus, et sagittis nulla. Pellentesque viverra facilisis dolor, et porta ex ornare sed. In euismod lectus vitae velit varius, sed semper sem finibus.

Pellentesque quis sem vel augue pharetra sollicitudin interdum sed diam. Duis tristique scelerisque porta. Vivamus at suscipit dui, nec suscipit ante. In urna dolor, efficitur ut consequat vel, mattis quis neque. Nulla sit amet accumsan neque. In nec neque nisi. Ut imperdiet luctus mauris, id imperdiet odio lobortis sit amet.`;

const dueDate = Date.now();

class JobDetailBody extends React.Component {
    render() {
        return (
            <Pane overflowY="auto">
                <Heading size={600}>{title}</Heading>
                <Text size={400}>Created at November 24, 2018</Text>
                <Paragraph marginTop="10px">{description}</Paragraph>
                <Paragraph marginTop="15px">
                    Price: <Strong>24₺</Strong><br/>
                    Estimated duration: <Strong>12 days</Strong><br/>
                    Due date: <Strong>{dateFormatter.format(dueDate)}</Strong>
                </Paragraph>
                <Paragraph marginTop="5px">
                    <Badge isSolid color="green">Article Writing</Badge>{" "}
                    <Badge isSolid color="yellow">Finansal Araştırma</Badge>{" "}
                    <Badge isSolid color="orange">Grafik Tasarımı</Badge>{" "}
                    <Badge isSolid color="purple">HTML</Badge>
                </Paragraph>
            </Pane>
        );
    }
}

export default JobDetailBody;