import firebase from "firebase/app"
import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAs4WfvMsTWuyN1_d786cXIaW_6AgRV6wE",
    authDomain: "reactnew-9cf83.firebaseapp.com",
    projectId: "reactnew-9cf83",
    storageBucket: "reactnew-9cf83.appspot.com",
    messagingSenderId: "227014763470",
    appId: "1:227014763470:web:b3ecf8ce651adf7167419f",
    measurementId: "G-B92LR3F9DL"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage};