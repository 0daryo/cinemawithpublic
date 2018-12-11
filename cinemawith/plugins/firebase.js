import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "pass",
    authDomain: "pass",
    databaseURL: "pass",
    projectId: "pass",
    storageBucket: "pass",
    messagingSenderId: "pass"
  })
}

export default firebase
