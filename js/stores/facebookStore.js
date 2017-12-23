import ActionTypes from '../constants';
import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';

// import firebase, { auth, provider } from './firebase.js';

const FACEBOOK_CHANGE_EVENT = 'FACEBOOK_CHANGE_EVENT';

class FacebookStore extends EventEmitter {
    constructor() {
        super()
        this.facebookAuthData = {};
        this.facebookPictureData = {};
        Dispatcher.register(this._registerToActions.bind(this));
    }

    // Switches over the action's type when an action is dispatched.
    _registerToActions(action) {
        console.log('fb registered');
        switch(action.actionType) {
            case ActionTypes.FACEBOOK_LOGIN_CHANGE:
                this.setFacebookAuthData(action.payload);
                break;
            case ActionTypes.FACEBOOK_GETTING_PICTURE:
                this.setFacebookPictureData(action.actionType, action.payload)
                break;
            case ActionTypes.FACEBOOK_RECEIVED_PICTURE:
                this.setFacebookPictureData(action.actionType, action.payload);
                break;
            break;
        }
    }

    setFacebookAuthData(data) {
        console.log('setFacebookAuthData');
        console.log(data);
        console.log('---' + data.name + '---')
        this.facebookAuthData = data;
        this.emitChange();
    }

    get loggedIn() {
        if (!this.facebookAuthData) {
            return;
        }

        return this.facebookAuthData.status == 'connected';
    }

    get userFullName() {
        console.log('userFullName');
        console.log(this.facebookAuthData);
        console.log('---' + this.facebookAuthData.name + '---')

        if (!this.facebookAuthData || !this.facebookAuthData.authResponse) {
            return;
        }
        console.log(this.facebookAuthData);
        return this.facebookAuthData.name;
    }

    get userId() {
        if (!this.facebookAuthData || !this.facebookAuthData.authResponse) {
            return;
        }

        return this.facebookAuthData.authResponse.userID;
    }

    get accessToken() {
        if (!this.facebookAuthData || !this.facebookAuthData.authResponse) {
            return;
        }

        return this.facebookAuthData.authResponse.accessToken;
    }

    get facebookPictureUrl() {
        if (!this.facebookPictureData || !this.facebookPictureData.url) {
            return;
        }

        return this.facebookPictureData.url;
    }

    setFacebookPictureData(type, data) {
        this.facebookPictureStatus = type;

        if (data) {
            this.facebookPictureData = data.data
        } else {
            this.facebookPictureData = {};
        }

        this.emitChange();
    }

    emitChange() {
        this.emit(FACEBOOK_CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(FACEBOOK_CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(FACEBOOK_CHANGE_EVENT, callback);
    }
}

export default new FacebookStore();
