import React from 'react';
import MountainStore from '../stores/mountainStore';
import MountainActions from '../actions/MountainActions';
import MountainRange from './MountainRange';

class MountainRanges extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mountainRanges: MountainStore.getAllMountains(),
    };

    this._onChange = this._onChange.bind(this);
  }

  mountainsGroupedByRange(mountains) {
    var ranges = {}
    Object.values(mountains).forEach(function(mountain){
      if (ranges[mountain.range_name] == undefined) {
        ranges[mountain.range_name] = {}
        ranges[mountain.range_name]['name'] = mountain.range_name
        ranges[mountain.range_name]['mountains'] = []
      }
      ranges[mountain.range_name]['mountains'].push(mountain);
    })
    return ranges;
  }

  _onChange() {
    this.setState({})
    this.setState({ mountainRanges: this.mountainsGroupedByRange(MountainStore.getAllMountains()) });
  }

  componentWillMount() {
    MountainStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    MountainStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div className="row">
        {Object.values(this.state.mountainRanges).map((mountainRange) => {
          return (<MountainRange mountainRange={mountainRange}/>);
        })}
      </div>
    );
  }
}

export default MountainRanges;
