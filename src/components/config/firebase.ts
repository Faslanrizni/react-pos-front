
import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCB_rmT4QBJmOyCubkNe2u_TupznjsA1xk",
    authDomain: "react-f9b7c.firebaseapp.com",
    projectId: "react-f9b7c",
    storageBucket: "react-f9b7c.appspot.com",
    messagingSenderId: "790124972234",
    appId: "1:790124972234:web:7f31ca0316056607e8cc33",
    measurementId: "G-5ZPJVV3LZM"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage};