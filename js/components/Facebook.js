import React from 'react';

import FacebookActions from '../actions/FacebookActions';
import FacebookStore from '../stores/FacebookStore';
import UserStore from '../stores/userStore';
import FacebookLogin from './FacebookLogin';
import FacebookLogout from './FacebookLogout';
import FacebookDownloadPicture from './FacebookDownloadPicture';
import FacebookPicture from './FacebookPicture';

class Main extends React.Component {
    constructor(props) {
        super();
        this.state = {}
    }

    getFacebookState() {
        console.log('getfacebookstate');
        console.log(FacebookStore.userId);
        return {
            accessToken: FacebookStore.accessToken,
            loggedIn: FacebookStore.loggedIn,
            userId: FacebookStore.userId,
            fullName: FacebookStore.userFullName,
            facebookPictureStatus: FacebookStore.facebookPictureStatus,
            facebookPictureUrl: FacebookStore.facebookPictureUrl
        }
    }

    componentDidMount() {
        FacebookActions.initFacebook();
        FacebookStore.addChangeListener(() => this._onFacebookChange());
    }

    componentWillUnmount() {
        FacebookStore.removeChangeListener(this._onFacebookChange);
      }

    _onFacebookChange() {
        this.setState(this.getFacebookState());
    }


    render() {
        return (
            <li>
              <FacebookLogin />
            </li>

        );
    }
}

export default Main;
