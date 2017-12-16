import React from 'react';
import Facebook from './Facebook';
import User from './User';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">14ers Checklist</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <Facebook/>
            <User/>
            <li><a href="about.html">About</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
