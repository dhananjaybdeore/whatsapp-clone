// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrVcIwQrbFA1EWCDabN1IO6Ya9ynSL7AY",
  authDomain: "whatsapp-clone-eae85.firebaseapp.com",
  projectId: "whatsapp-clone-eae85",
  storageBucket: "whatsapp-clone-eae85.appspot.com",
  messagingSenderId: "970627076243",
  appId: "1:970627076243:web:06f55445f95ce485d83d66",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
