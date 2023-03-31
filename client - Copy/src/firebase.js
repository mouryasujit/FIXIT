// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0JSZ3PvaILARK8tcKBXyKNiwR4Hsd5Cs",
  authDomain: "fixit-71fab.firebaseapp.com",
  projectId: "fixit-71fab",
  storageBucket: "fixit-71fab.appspot.com",
  messagingSenderId: "576657164165",
  appId: "1:576657164165:web:360cdf30734505f05de6ec",
  measurementId: "G-445RMN6WLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export const provider = new GoogleAuthProvider();
export default app;
