import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({   
    apiKey: "AIzaSyCPtHpUlaLXO0KubcK3sCnE3oNLqBo0YqE",
    authDomain: "vuefirebase-f0c31.firebaseapp.com",
    projectId: "vuefirebase-f0c31",
    storageBucket: "vuefirebase-f0c31.appspot.com",
    messagingSenderId: "882599444103",
    appId: "1:882599444103:web:6145972e0e0b7507278222",
    measurementId: "G-LXBHPFVCZ5"})
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })

