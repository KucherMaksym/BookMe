// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpzn3RhPZ6b3OH7Mhbnusnc6WaxAM3_L0",
    authDomain: "booking-e5728.firebaseapp.com",
    projectId: "booking-e5728",
    storageBucket: "booking-e5728.appspot.com",
    messagingSenderId: "475040505958",
    appId: "1:475040505958:web:7537d192ac512f80ef8da7",
    measurementId: "G-729NG0DLFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);