import React, {PropTypes} from 'react';
import ProfileArea from './client_area.jsx';
import "./style.css";

class ClientProfilePage extends React.Component {
  render() {
    return (
      <div className="clientProfilePage">
        <ProfileArea
        username="ladybug"
        emailAddress="ladybug@whatever.com"
        />
      </div>
    );
  }
}


export default ClientProfilePage;