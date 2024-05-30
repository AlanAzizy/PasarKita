// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {getFirestore, Firestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getReactNativePersistence, initializeAuth, browserSessionPersistence } from "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSzh7HWlZUIgfVtwE8a0Rrw1YXaj-FjHM",
  authDomain: "pasarkita-7542e.firebaseapp.com",
  projectId: "pasarkita-7542e",
  storageBucket: "pasarkita-7542e.appspot.com",
  messagingSenderId: "282365196493",
  appId: "1:282365196493:web:252a4e0e25d2ec81195184",
  measurementId: "G-VNLV02VNG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const firebaseStorage = getStorage(app);
const persistence = Platform.OS === 'web'
           ? browserSessionPersistence
           : getReactNativePersistence(ReactNativeAsyncStorage);
       const auth = initializeAuth(app, {persistence});

export { firestore, firebaseStorage, auth, app };
