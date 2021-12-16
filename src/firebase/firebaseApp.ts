import { initializeApp, applicationDefault, cert, getApp,  } from'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, } from 'firebase-admin/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as admin from 'firebase-admin'

export const app = admin.initializeApp({
    credential: applicationDefault(),
   // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
export const auth = getAuth();


export const db = getFirestore();

