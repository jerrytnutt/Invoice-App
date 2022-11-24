import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD8560i-RWnDZIscCFL2sbMHt7klmqV3to',
  authDomain: 'invoice-d94ef.firebaseapp.com',
  projectId: 'invoice-d94ef',
  storageBucket: 'invoice-d94ef.appspot.com',
  messagingSenderId: '839590479607',
  appId: '1:839590479607:web:a367321c3b9b49713d35f2',
  measurementId: 'G-K578N6FM70',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Authorization
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Auth change listiner
export const onAuth = onAuthStateChanged;

export const createUser = createUserWithEmailAndPassword;
export const signInUser = signInWithEmailAndPassword;
export const signOutUser = signOut;

//export const firestoreCollection = collection;
//export const firestoreDocs = getDocs;
