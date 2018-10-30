import React from "react";
import { Pane, Card, Heading, Paragraph, Text, SearchInput } from "evergreen-ui";
import { Link } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";

function DashboardBase(props) {
    return (
        <Pane background="#fff" width="100%" height="100%">
            <HeaderBar />
            <Pane
                display="flex"
                height="100%"
                background="tint2"
                margin={5}
                border="default"
                elevation={1}>
                <Pane flex="1" height="100%" padding={10}>
                    <Heading textAlign="center">Last active members</Heading>
                </Pane>
                <Pane flex="3" height="100%" padding={10}>
                    <SearchInput placeholder="Search projects" width="100%"/>
                    <Pane display="flex">
                        <Card
                            elevation={1}
                            width="100%"
                            marginTop="10px"
                            height={120}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            padding="10px"
                            background="white">
                            <Heading textAlign="center">Translation of the WorkHub platform</Heading>
                            <Link to="/profile/client"><Text size={100}>Ilber Tatlici</Text></Link>
                            <Paragraph marginTop="10px" textAlign="center">
                                Acun abi; Biga'dan geliyom, normalde Ankaraliyim<br/> ama isim cikti. Ceviri yaptircam.
                            </Paragraph>
                        </Card>
                        <Card
                            elevation={1}
                            width="100%"
                            marginTop="10px"
                            marginLeft="10px"
                            height={120}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            padding="10px"
                            background="white">
                            <Heading textAlign="center">Painting of my cat</Heading>
                            <Link to="/profile/client"><Text size={100}>Ilber Tatlici</Text></Link>
                            <Paragraph marginTop="10px" textAlign="center">
                                Hello, I need painting of my beautiful cat. Acun abiii; kedim cok guzel abi.
                            </Paragraph>
                        </Card>
                    </Pane>
                </Pane>
            </Pane>
        </Pane>
    );
}

export default DashboardBase;
