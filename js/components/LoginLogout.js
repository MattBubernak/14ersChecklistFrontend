import React from 'react';

import firebase, { auth, provider } from '../firebase.js';

class Main extends React.Component {
    constructor(props) {
        super();
        this.state = { user: null }
        this.login = this.login.bind(this); // <-- add this line
        this.logout = this.logout.bind(this);
    }

    handleChange(e) {
      /* ... */
    }
    logout() {
      firebase.auth().signOut().then((result) => {
          console.log('signed out');
        }, function(error) {
          console.error('Sign Out Error', error);
        });
    }
    login() {
      auth.signInWithPopup(provider)
        .then((result) => {
          console.log('logged in');
        });
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // FacebookStore.removeChangeListener(this._onFacebookChange);
      }

    _onFacebookChange() {
        // this.setState(this.getFacebookState());
    }


    render() {
        return (
            <li>
              {this.props.user ?
                <a onClick={this.logout}>Log Out</a>
                :
                <a onClick={this.login}>Log In</a>
              }
            </li>

        );
    }
}

export default Main;
