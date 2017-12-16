import React from 'react';

import FacebookActions from '../actions/FacebookActions';

class FacebookLogout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button ref="logoutButton" onClick={this.didClickFacebookLogoutButton}>Log Out of Facebook</button>
        );
    }

    didClickFacebookLogoutButton(e) {
        FacebookActions.logout()
    }
}

export default FacebookLogout;
