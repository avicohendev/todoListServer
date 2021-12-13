import { initializeApp, applicationDefault, cert } from'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue} from 'firebase-admin/firestore';



initializeApp({
    credential: applicationDefault(),
   // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});


export const db = getFirestore();



