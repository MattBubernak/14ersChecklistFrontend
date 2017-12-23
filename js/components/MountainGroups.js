import React from 'react';
// import MountainStore from '../stores/mountainStore';
// import MountainActions from '../actions/MountainActions';
import MountainRange from './MountainRange';
import firebase, { auth, provider } from '../firebase.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MountainGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mountains: {},
      userChecks: {},
    };

  }

  mountainsGroupedByRangeWithCheck() {
    let mountains = this.state.mountains;
    var ranges = {}
    var self = this;
    Object.keys(mountains).forEach(function(key){
      let mountain = mountains[key];
      if (ranges[mountain.range] == undefined) {
        ranges[mountain.range] = {}
        ranges[mountain.range]['name'] = mountain.range
        ranges[mountain.range]['mountains'] = {}
      }
      mountain['check'] = self.state.userChecks[key];
      ranges[mountain.range]['mountains'][key] = mountain;
    })
    return ranges;
  }


  componentWillReceiveProps(newProps) {
    this.retrieveUserChecks(newProps.user);
  }

  retrieveUserChecks(user) {
    if (user == undefined) {
      this.setState({ mountains: this.state.mountains, userChecks: {}})
      return;
    }
    let userChecks = firebase.database().ref('userChecks/' + user.uid);
    userChecks.on('value', (snapshot) => {
      let userChecks = snapshot.val();
      this.setState({ mountains: this.state.mountains, userChecks: userChecks });
    })
  }

  componentWillMount() {
    let mountainRef = firebase.database().ref('mountains');
    mountainRef.on('value', (snapshot) => {
      let mountains = snapshot.val();
      this.setState({ mountains: mountains, userChecks: this.state.userChecks });
    })
  }

  componentWillUnmount() {
    MountainStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div className="row">
        {Object.values(this.mountainsGroupedByRangeWithCheck()).map((mountainRange) => {
          return (<MountainRange key={mountainRange.name} mountainRange={mountainRange} user={this.props.user}/>);
        })}
      </div>
    );
  }
}

export default MountainGroups;
