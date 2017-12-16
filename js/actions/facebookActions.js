import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

const APP_ID = '1733850649968229'

const FacebookActions = {
  initFacebook: function(){
      console.log('initFacebook');
      window.fbAsyncInit = function() {
        window.FB.init({
          appId      : APP_ID,
          cookie     : true,  // enable cookies to allow the server to access the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.5' // use graph api version 2.5
        });
        window.FB.AppEvents.logPageView();
        window.FB.Event.subscribe('auth.statusChange', FacebookActions.getLoginStatus);
        FacebookActions.getLoginStatus();
      };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
  getLoginStatus : function() {
    console.log('getLoginStatus');
    window.FB.getLoginStatus((response) => {
      console.log('getLoginStatus response');
      console.log(response);
      Dispatcher.dispatch({
        actionType : ActionTypes.FACEBOOK_LOGIN_CHANGE,
        payload : response
      });
    });
  },

  // login: function(resp) {
  //   console.log("login_event");
  //   FB.getLoginStatus(function(response) {
  //     if (response.status === 'connected') {
  //       Dispatcher.dispatch({
  //           actionType: ActionTypes.FACEBOOK_LOGGED_IN,
  //           payload: resp
  //       });
  //     }
  //   });
      // console.log('login initiated');
      // window.FB.login(  (response) => {
      //     if (response.status === 'connected') {
      //       FB.api('/me?fields=picture,age_range,birthday,id,first_name,last_name,email,gender,name,verified',
      //             function(res) {
      //               console.log('fb api call');
      //               console.log(res);
      //               var resp = Object.assign(response, res);
      //               console.log(resp);
      //               Dispatcher.dispatch({
      //                   actionType: ActionTypes.FACEBOOK_LOGGED_IN,
      //                   payload: resp
      //               });

      //             },{scope : 'email,user_birthday'});
      //     }
      // });
  // },

  // logout: () => {
  //   console.log("logout_event");
  //   FB.getLoginStatus(function(response) {
  //     if (response.status != 'connected') {
  //       Dispatcher.dispatch({
  //           actionType: ActionTypes.FACEBOOK_LOGGED_OUT,
  //           payload: response
  //       })
  //     }
  //   });
  // },

  getFacebookProfilePicture: (userId) => {
    Dispatcher.dispatch({
        actionType: ActionTypes.FACEBOOK_GETTING_PICTURE,
        payload: null
    })
    window.FB.api(`/${userId}/picture?type=large`, (response) => {
      FacebookDispatcher.dispatch({
          actionType: Constants.FACEBOOK_RECEIVED_PICTURE,
          data: response
      })
    })
  }

}

export default FacebookActions;

