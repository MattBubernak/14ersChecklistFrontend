import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

class MountainActions {

	addNewMountain(mountain) {
		// Note: This is usually a good place to do API calls.
		Dispatcher.dispatch({
			actionType: ActionTypes.ADD_NEW_MOUNTAIN,
			payload: mountain
		});
	}

  checkMountain(id) {
    console.log("DISPATCHING CHECK MOUNAIN");
    Dispatcher.dispatch({
      actionType: ActionTypes.CHECK_MOUNTAIN,
      payload: id
    })
  }

  uncheckMountain(id) {
    Dispatcher.dispatch({
      actionType: ActionTypes.UNCHECK_MOUNTAIN,
      payload: id
    })
  }

  // receiveMountains(response) {
  //   // Note: This is usually a good place to do API calls.
  //   Dispatcher.dispatch({
  //     actionType: ActionTypes.GET_MOUNTAINS,
  //     payload: response
  //   });
  // }

  getMountainsAPI() {
    Dispatcher.dispatch({
      actionType: ActionTypes.GET_MOUNTAINS_API,
    });

    loadMountainsApi();
  }

}

export default new MountainActions();
