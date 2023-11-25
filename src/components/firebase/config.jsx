import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth";
import {getStorage} from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB_dnRe5DVUfVNYSCVSCXuKTujyCnhvsEs",
//   authDomain: "paintings-b671b.firebaseapp.com",
//   projectId: "paintings-b671b",
//   storageBucket: "paintings-b671b.appspot.com",
//   messagingSenderId: "128504443456",
//   appId: "1:128504443456:web:460d358b84614a8ee265a5",
//   measurementId: "G-YJZNJHL0Z9"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAg3LjORjCNTyh0XdusBMGDlv5g4LCustA",
  authDomain: "hbs-website-react.firebaseapp.com",
  projectId: "hbs-website-react",
  storageBucket: "hbs-website-react.appspot.com",
  messagingSenderId: "843422961652",
  appId: "1:843422961652:web:72eb03a6e3e473133c33a1",
  measurementId: "G-0TY06XF53J"
};
//   if(!firebase.apps.length){
//     firebase.initializeApp(firebaseConfig);
// }else{
//     firebase.app()
// }

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);