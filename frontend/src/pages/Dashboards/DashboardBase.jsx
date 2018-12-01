import React from "react";
import {
    Pane,
    Badge,
    Strong,
    Heading,
    Paragraph,
    Icon,
    SearchInput,
    Text
} from "evergreen-ui";
import { cropText } from "../../utils";
import { Link } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";

const options = { year: "numeric", month: "long", day: "numeric" };
const dateFormatter = new Intl.DateTimeFormat("en-EN", options);

const JobCard = props => {
    const {
        jobId,
        title,
        description,
        createdDate,
        bidNumber,
        /* categories, */
        price,
        clientName,
        clientRating
    } = props;

    return (
        <Pane
            elevation={0}
            width="100%"
            marginTop="10px"
            padding="20px"
            display="flex"
            background="tint1">
            <Pane flex={4}>
                <Heading size={500}>
                    <Link to={`/job/${jobId}`}>{title}</Link>
                </Heading>
                <Paragraph marginTop="10px" color="muted">
                    {description && cropText(description, 220)}
                </Paragraph>
                <Pane marginTop={10}>
                    <Pane display="flex" justifyContent="space-between">
                        <Pane display="flex" alignItems="center">
                            <Icon icon="time" color="default" />{" "}
                            <Text marginLeft={5}>
                                Opened at {dateFormatter.format(createdDate)} –{" "}
                                {bidNumber} bid
                            </Text>
                        </Pane>
                        <Pane display="flex" alignItems="center">
                            <Icon icon="user" color="default" />
                            <Text marginLeft={5}>
                                <Strong href="#" color="default">
                                    {clientName}
                                </Strong>{" "}
                                <Badge color="green">{clientRating}</Badge> (100
                                ratings)
                            </Text>
                        </Pane>
                    </Pane>
                    <Pane display="flex" alignItems="center" marginTop={5}>
                        <Icon icon="tag" color="default" />
                        <Text marginLeft={5}>
                            <Badge isSolid color="green">
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
                            </Badge>
                        </Text>
                    </Pane>
                </Pane>
            </Pane>
            <Pane flex={1} justifyContent="flex-end">
                <Heading size={700} textAlign="right">
                    {price}₺
                </Heading>
            </Pane>
        </Pane>
    );
};

function DashboardBase(props) {
    return (
        <Pane background="tint1" width="100%" height="100%">
            <HeaderBar userType={props.userType} />
            <Pane
                display="flex"
                height="100%"
                background="tint1"
                paddingY={30}
                margin={5}>
                <Pane
                    flex="1"
                    background="white"
                    marginLeft={40}
                    paddingTop={30}
                    padding={20}
                    border="default">
                    <Heading size={400}>Filter</Heading>
                </Pane>
                <Pane
                    flex="3"
                    background="white"
                    border="default"
                    height="100%"
                    padding={30}
                    marginLeft={20}
                    marginRight={40}>
                    <SearchInput
                        placeholder="Search projects"
                        marginTop={10}
                        height={40}
                        width="100%"
                    />
                    <Heading marginTop={30} size={800}>
                        Suggested Jobs
                    </Heading>
                    <Paragraph marginTop={4} size={400}>
                        Curated with your old projects and preferences in mind.
                    </Paragraph>
                    <Pane marginTop={16}>
                        <JobCard
                            jobId="1"
                            title="deneme"
                            description="description"
                            createdDate={new Date()}
                            bidNumber={5}
                            price={20}
                            clientName="Ergun E."
                            clientRating={3.0}
                        />
                        <JobCard
                            jobId="2"
                            title="cok iyi"
                            description="baya iyi description"
                            createdDate={new Date()}
                            bidNumber={5}
                            price={20}
                            clientName="Ergun E."
                            clientRating={3.0}
                        />
                        <JobCard
                            jobId="3"
                            title="deneme"
                            description="description"
                            createdDate={new Date()}
                            bidNumber={5}
                            price={20}
                            clientName="Ergun E."
                            clientRating={3.0}
                        />
                    </Pane>
                </Pane>
            </Pane>
        </Pane>
    );
}

export default DashboardBase;
