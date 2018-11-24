import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAjGPffQ6HLaiq_osSOIGhdbTvXFuaSIEw",
    authDomain: "cinemawith-48653.firebaseapp.com",
    databaseURL: "https://cinemawith-48653.firebaseio.com",
    projectId: "cinemawith-48653",
    storageBucket: "cinemawith-48653.appspot.com",
    messagingSenderId: "777497580577"
  })
}

export default firebase
