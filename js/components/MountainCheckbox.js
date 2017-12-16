import React from 'react';
import MountainStore from '../stores/mountainStore';
import MountainActions from '../actions/MountainActions';

class MountainCheckbox extends React.Component {

  constructor(props) {
    super(props);
  }


  handleChecked(event){
    if (event.target.checked) {
      MountainActions.checkMountain(this.props.id);
    }
    else {
      MountainActions.uncheckMountain(this.props.id);
    }
  }

  render() {
    return (
      <span>
        <input
          id={this.props.id}
          type="checkbox"
          onChange={this.handleChecked.bind(this)}
          checked={this.props.checked}
        />
        <label htmlFor={this.props.id}>{this.props.name}
        </label>
      </span>
    );
  }
}

export default MountainCheckbox;
