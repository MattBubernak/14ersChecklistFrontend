import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';
import MountainStore from '../stores/mountainStore';
import request from 'superagent';

const CHANGE = 'USER_CHANGE';

class UserStore extends EventEmitter {
  constructor() {
      console.log('constructed');
      super()
      Dispatcher.register(this._registerToActions.bind(this));
      this._userState = {};
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
      console.log('user registered');
      switch(action.actionType) {
          case ActionTypes.FACEBOOK_LOGIN_CHANGE:
              this.setUserDataFromFacebookLogin(action.payload);
              break;
          case ActionTypes.RECEIVE_USER_FROM_SERVER:
              this.receiveUserFromServer(action.payload);
              break;
          break;
      }
  }

  receiveUserFromServer(user) {
    if (user.id == undefined) {
      console.log('USER_STORE: something went wrong')
      return;
    }
    console.log('receiveuserFromServer' + user.id);
    console.log(user);
    console.log("-===============");
    this._userState = user
    MountainStore.requestDataFromServer();
    this.emit(CHANGE);
  }

  // Returns the current store's state.
  getUser() {
    console.log('getUser===');
    console.log(this._userState);
    console.log('getUser=^^');
    return this._userState;
  }

  setUserDataFromFacebookLogin(data) {
    console.log('set user data from fb login');
    if (data.status == 'connected') {
      console.log("I should request user from server");
      request.get('http://localhost:3005/api/v1/get_user').query({fb_id: data.authResponse.userID}).end(function(err, response) {
        var user = JSON.parse(JSON.parse(response.text).user);
        console.log("GOT BACK FROM SERVER");
        console.log(user);
        console.log("____________________")
        Dispatcher.dispatch({
          actionType: ActionTypes.RECEIVE_USER_FROM_SERVER,
          payload: user
        });
      });
    }
    this.emit(CHANGE);
  }

// Hooks a React component's callback to the CHANGE event.
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // Removes the listener from the CHANGED event.
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }

}

export default new UserStore();
