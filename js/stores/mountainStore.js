import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';
import request from 'superagent';
import UserStore from '../stores/userStore';

const CHANGE = 'CHANGE';
let _mountainState = {};

class MountainStore extends EventEmitter {

	constructor() {
		console.log('constructor');
		super();

		this.requestDataFromServer();
		// Registers action handler with the Dispatcher.
		Dispatcher.register(this._registerToActions.bind(this));
	}

	// Switches over the action's type when an action is dispatched.
	_registerToActions(action) {
		console.log("THIS IS THE ACTION" + action.actionType);
		switch(action.actionType) {
			case ActionTypes.ADD_MOUNTAINS_FROM_SERVER:
				this._addNewMountains(action.payload);
			  break;
			case ActionTypes.UNCHECK_MOUNTAIN:
				this._uncheckMountain(action.payload);
			  break;
			case ActionTypes.CHECK_MOUNTAIN:
				this._checkMountain(action.payload);
			  break;
			default:
			  break;
			// case ActionTypes.NEW_USER:
			// 	this.requestDataFromServer;
			// break;
		}
	}

	_doNothing(payload) {
		console.log('do nothing was calleed...');
		return;
	}

	_uncheckMountain(id) {
  	var user = UserStore.getUser();
		console.log('UNCHECK');
		console.log(id);
		var query_params = {user_id: user.id, mountain_id: id}
		_mountainState[id].checked = false;
		this.emit(CHANGE);
		request.post('http://localhost:3005/api/v1/ascents/destroy').query(query_params).end(function(err, response) {
			console.log("sent to server");
    });
	}

	_checkMountain(id) {
  	var user = UserStore.getUser();
		console.log('CHECK.');
		var query_params = {user_id: user.id, mountain_id: id}
		_mountainState[id].checked = true;
		this.emit(CHANGE);
		request.post('http://localhost:3005/api/v1/ascents').query(query_params).end(function(err, response) {
			console.log("sent to server");
    });
	}
	// Adds a new item to the list and emits a CHANGED event.
	_addNewMountains(mountains) {
		console.log('add new mountains');
		_mountainState = mountains.reduce(function(map,obj){map[obj.id] = obj; return map;},{});
		console.log(_mountainState);
		this.emit(CHANGE);
	}

	// Returns the current store's state.
	getAllMountains(data) {
		console.log("getAllMountains");
		console.log(_mountainState);
		return _mountainState;
	}

	getMountain(id) {
		console.log("getMountain");
		return _mountainState;
	}

	getChecklistCount() {
		return Object.values(_mountainState).reduce(function(count,obj){return obj.checked ? ++count : count;},0);;
	}

  requestDataFromServer(data = null) {
  	console.log('requesting data from server');
  	var user = UserStore.getUser();
  	var query_params = {};
  	if (user.id != undefined) {
  		query_params['user_id'] = user.id;
  	}
  	console.log(query_params);
    request.get('http://localhost:3005/api/v1/mountains').query(query_params).end(function(err, response) {
      var mountains = JSON.parse(JSON.parse(response.text).mountains);
	    Dispatcher.dispatch({
	      actionType: ActionTypes.ADD_MOUNTAINS_FROM_SERVER,
	      payload: mountains
	    });
    });
    return;
  }

	// // Calculate the total budget.
	// getTotalBudget() {
	// 	let totalBudget = 0;

	// 	_mountainState.forEach((mountain) => {
	// 		totalBudget += parseFloat(item.amount);
	// 	});

	// 	return totalBudget;
	// }

	// Hooks a React component's callback to the CHANGE event.
	addChangeListener(callback) {
		this.on(CHANGE, callback);
	}

	// Removes the listener from the CHANGED event.
	removeChangeListener(callback) {
		this.removeListener(CHANGE, callback);
	}
}

export default new MountainStore();
