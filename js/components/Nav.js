import React from 'react';
import LoginLogout from './LoginLogout';
import UserInfoNav from './UserInfoNav';

class Nav extends React.Component {

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">14ers Checklist</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <LoginLogout user = {this.props.user}/>
            <UserInfoNav user = {this.props.user}/>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
