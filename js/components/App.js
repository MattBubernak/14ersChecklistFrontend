import React from 'react';
// // import AddNewItem from './AddNewItem';
import MountainGroups from './MountainGroups';
// import TotalCount from './TotalCount';
import Nav from './Nav';
import firebase, { auth, provider } from '../firebase.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('there is now a user');
        this.setState({
          user: auth.currentUser
        });
      } else {
        console.log('there is not a user');
        this.setState({
          user: undefined
        });
      }
    }.bind(this));
  }


	render() {
		return (
      <body>
        <Nav user = {this.state.user}/>
  			<div className="container">
          <MountainGroups user={this.state.user}/>
  			</div>
      </body>
		);
	}
}

export default App;
