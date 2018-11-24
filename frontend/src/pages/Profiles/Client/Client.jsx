import React from "react";
import ProfileArea from "./ClientArea.jsx";

class ClientProfilePage extends React.Component {
    render() {
        return (
            <div className="clientProfilePage">
                <ProfileArea user={this.props.user}/>
            </div>
        );
    }
}

export default ClientProfilePage;
