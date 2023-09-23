import firebase from "firebase/compat/app";
import "firebase/compat/database"

import  "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDCsPTKvkc9s50OKsXtgwl6K0pe8VzfKjs",
  authDomain: "react-firebase-3329b.firebaseapp.com",
  projectId: "react-firebase-3329b",
  storageBucket: "react-firebase-3329b.appspot.com",
  messagingSenderId: "476348860892",
  appId: "1:476348860892:web:3cdca28559450db6352719",
};

const firedb = firebase.initializeApp(firebaseConfig);
export default firebase.database().ref();