import React from "react";
import imgclient from "./images.jpg";
import StarRatingComponent from "react-star-rating-component";
import { Pane, Text } from "evergreen-ui";
import { Link } from "react-router-dom";
import "./style.css";

class JobDetailUser extends React.Component {
    render() {
        return (
            <Pane display="flex" justifyContent="center" flexDirection="column">
                <img
                    src={imgclient}
                    alt="Profile"
                    height={180}
                    width={160}
                    class="border"
                />
                <Pane>
                    <StarRatingComponent
                        name="Rating"
                        editing={false}
                        starCount={5}
                        value={4}
                    />
                </Pane>
                <Text fontWeight="bold" src="/profile">
                    <Link to={"/profile/1"}>Elenore Deren Yıldız</Link>
                </Text>
            </Pane>
        );
    }
}

export default JobDetailUser;
