// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW8BgLVhG-K3aqXH2g0zDMkx2D7rsOWcU",
  authDomain: "whatsapp-clone-fe51d.firebaseapp.com",
  projectId: "whatsapp-clone-fe51d",
  storageBucket: "whatsapp-clone-fe51d.appspot.com",
  messagingSenderId: "182277056053",
  appId: "1:182277056053:web:678762bc0da8a48b34f37c",
  measurementId: "G-ZP4DPZYGEJ",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
