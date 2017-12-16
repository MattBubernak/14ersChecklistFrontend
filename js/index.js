import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Nav from './components/Nav';

import firebase from './firebase.js';

const config = {
  apiKey: "AIzaSyBc9nXTtXvHpmY7mjV-QE9lCPstvv7DDuk",
  authDomain: "fourteenerschecklist.firebaseapp.com",
  databaseURL: "https://fourteenerschecklist.firebaseio.com",
  projectId: "fourteenerschecklist",
  storageBucket: "",
  messagingSenderId: "562447019997"
};
firebase.initializeApp(config);

ReactDOM.render((<body><Nav /><App /></body>), document.getElementById('app'));
