import { combineReducers, compose, createStore } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/firestore";

// Configure firestore
const firebaseConfig = {
  apiKey: "AIzaSyDWg6llko4SA9-4S-n7hrHZyL9lKutDYxM",
  authDomain: "biblio-redux-app.firebaseapp.com",
  databaseURL: "https://biblio-redux-app.firebaseio.com",
  projectId: "biblio-redux-app",
  storageBucket: "biblio-redux-app.appspot.com",
  messagingSenderId: "1004157845660",
  appId: "1:1004157845660:web:aa6d942c0305d09a156d59"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// React-redux config
const rrfConfig = {
  userProfile: "users",
  userFirestoreForProfile: true
};

// Create the enhancer with compose redux & firestore
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(reactReduxFirebase(firebase) && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
