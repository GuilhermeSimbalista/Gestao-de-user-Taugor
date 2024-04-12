import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


const firebaseConfig = {
  apiKey: "you-key",
  authDomain: "you-key",
  projectId: "you-key",
  storageBucket: "you-key",
  messagingSenderId: "you-key",
  appId: "you-key"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// exportando o modulo
export { firebase }