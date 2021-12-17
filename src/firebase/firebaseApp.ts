import { initializeApp, applicationDefault, cert, getApp,  } from'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, } from 'firebase-admin/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as admin from 'firebase-admin'
import { firestore } from 'firebase-admin';
import {List, ListItem} from '../models/list'
import {converter} from '../utils/fireStoreConverter'
export const app = admin.initializeApp({
    credential: applicationDefault(),
   // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});


export const db = app.firestore(); //getFirestore();
export const dbCollectionsRef = {
    list : db.collection('list').withConverter(converter<List>()),
    listItems: db.collection('listItem').withConverter(converter<ListItem>()),

}

