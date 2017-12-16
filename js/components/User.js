import React from 'react';
import UserStore from '../stores/userStore';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: UserStore.getUser()
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({ user: UserStore.getUser() });
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  render() {

    // Show a friendly message instead if there are no mountains.

    return (
      <li> {this.state.user.id != undefined ? this.state.user.id : 'No User'}</li>
    );
  }
}

export default User;
