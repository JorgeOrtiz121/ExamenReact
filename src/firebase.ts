import firebase from 'firebase/app';
import 'firebase/auth';

// Replace this with the config for your own Firebase project
const firebaseConfig = {
    apiKey: "AIzaSyCb5C2tkaDScVxGRvfN99HNkfczPoOlDys",
    authDomain: "ionic-6a43c.firebaseapp.com",
    databaseURL: "https://ionic-6a43c-default-rtdb.firebaseio.com",
    projectId: "ionic-6a43c",
    storageBucket: "ionic-6a43c.appspot.com",
    messagingSenderId: "996667999140",
    appId: "1:996667999140:web:0901419c68b2224455f731",
    measurementId: "G-604EDZCX7W"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
