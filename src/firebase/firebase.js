import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './config';

// Initialize Firebase App
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
export const firebaseDb = firebaseApp.firestore();

// Disable deprecated features
firebaseDb.settings({
	timestampsInSnapshots: true,
});

// Initialize Auth through Firebase
export const firebaseAuth = firebaseApp.auth();
