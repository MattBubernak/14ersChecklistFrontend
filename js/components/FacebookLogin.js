import React from 'react';
import FacebookActions from '../actions/FacebookActions';

class FacebookLogin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="fb-login-button"
             data-max-rows="1"
             data-size="large"
             data-show-faces="false"
             data-auto-logout-link="true"
             data-scope='email'
             >Login
            </div>
        );
    }
}

export default FacebookLogin;
