import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCrR7PpdUX3oDX4Z9eaTz-BDi0b04oII1Y",
  authDomain: "demo1-d425a.firebaseapp.com",
  projectId: "demo1-d425a",
  storageBucket: "demo1-d425a.appspot.com",
  messagingSenderId: "609608678198",
  appId: "1:609608678198:web:f39e1a97ac033db3e7d197",
  measurementId: "G-X1CTPZR6QR"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}