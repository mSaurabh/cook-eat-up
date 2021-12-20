import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnIk4J3eloeeJCZ2Jy2hztZbJdsvUdbUQ",
  authDomain: "cook-eat-up.firebaseapp.com",
  projectId: "cook-eat-up",
  storageBucket: "cook-eat-up.appspot.com",
  messagingSenderId: "123716446308",
  appId: "1:123716446308:web:96c2c12359e122f3f1d771",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// initialize services
export const projectFirestore = firebase.firestore();
