import React from "react";
import ProfileArea from "./FreelancerArea.jsx";

class FreelancerProfilePage extends React.Component {
    render() {
        return (
            <div className="freelancerProfilePage">
                <ProfileArea user={this.props.user}/>
            </div>
        );
    }
}

export default FreelancerProfilePage;
