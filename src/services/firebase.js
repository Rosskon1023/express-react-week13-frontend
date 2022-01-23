import firebase from 'firebase/app';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC_CG60gFkgWo7x4IkSGPDGDEuZiG02Ae4",
    authDomain: "react-firebase-projects-be30e.firebaseapp.com",
    projectId: "react-firebase-projects-be30e",
    storageBucket: "react-firebase-projects-be30e.appspot.com",
    messagingSenderId: "709376457636",
    appId: "1:709376457636:web:ab20fb5b5ba8d1e68a1f31"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  function login() {
      return auth.signInWithPopup(provider);
  }

  function logout() {
      return auth.signOut();
  }

  export { auth, login, logout };