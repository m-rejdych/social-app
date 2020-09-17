import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDQDydicNhjSIiyLdonHcTlGCuxJ4v8kRU',
  authDomain: 'social-app-c3386.firebaseapp.com',
  databaseURL: 'https://social-app-c3386.firebaseio.com',
  projectId: 'social-app-c3386',
  storageBucket: 'social-app-c3386.appspot.com',
  messagingSenderId: '557426613537',
  appId: '1:557426613537:web:d095d03e085d0e4c4ff260',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

export { db, auth };
