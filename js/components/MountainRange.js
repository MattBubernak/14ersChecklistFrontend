import React from 'react';
import MountainStore from '../stores/mountainStore';
import MountainList from './MountainList';
class MountainRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mountains: MountainStore.getAllMountains(),
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({})
    this.setState({ mountains: MountainStore.getAllMountains() });
  }

  componentWillMount() {
    MountainStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    MountainStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div className="col s4">
        <div className="row">
          {this.props.mountainRange.name}
        </div>
        <div className="row">
          <MountainList mountains={this.props.mountainRange.mountains}/>
        </div>
      </div>
    );
  }
}

export default MountainRange;
