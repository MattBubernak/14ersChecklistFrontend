import React from 'react';
// import MountainStore from '../stores/mountainStore';
// import MountainActions from '../actions/MountainActions';
import firebase, { auth, provider } from '../firebase.js';

class MountainCheckbox extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChecked(event){
    var userChecks = firebase.database().ref("userChecks/" + this.props.user.uid + "/");
    userChecks.child(this.props.id).set({
      checked: !this.props.check.checked
    })
  }

  render() {
    return (
      <span>
        <input
          id={this.props.id}
          type="checkbox"
          onChange={this.handleChecked.bind(this)}
          checked={this.props.check ? this.props.check.checked : false}
          disabled={this.props.user ? false : true}
          // disabled= 'undefined' //{this.props.user ? 'disabled' : 'false'}
        />
        <label htmlFor={this.props.id}>{this.props.name}
        </label>
      </span>
    );
  }
}

export default MountainCheckbox;
