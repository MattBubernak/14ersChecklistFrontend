import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import MountainStore from '../stores/mountainStore';
import MountainList from './MountainList';
class MountainRange extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   mountains: MountainStore.getAllMountains(),
    // };

    // this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    // this.setState({})
    // this.setState({ mountains: MountainStore.getAllMountains() });
  }

  componentWillMount() {
    //MountainStore.addChangeListener(this._onChange);
  }

  // componentWillUnmount() {
  //   MountainStore.removeChangeListener(this._onChange);
  // }

  render() {
    return (
        <div className="col s3" key="this.props.mountainRange.name">
          <div className="card">
            <div className="card-image">
              <img src={"images/" + this.props.mountainRange.name.replace(/ /g,"_").toLowerCase() + ".jpg"}></img>
              <span className="card-title">
                {this.props.mountainRange.name}
              </span>
            </div>
            <div className="card-content">
              <MountainList mountains={this.props.mountainRange.mountains} user={this.props.user}/>
            </div>
          </div>
        </div>
    );
  }
}

export default MountainRange;
