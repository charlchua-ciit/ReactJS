import firebase from 'firebase/compat/app';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_SID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MID
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  setPersistence(auth, browserLocalPersistence);
  const time = firebase.firestore.FieldValue.serverTimestamp()

  export { db,auth,time }