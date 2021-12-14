import {db, } from './firebase/firebaseApp'
import { getFirestore, Timestamp, FieldValue, Transaction} from 'firebase-admin/firestore';
console.log('aaaa');


const itemStatus = {
  complete : "complete",
  notComplete : "notComplete",
  runningLow: "runningLow"
}
const docRef = db.collection('users').doc('alovelace');
const func = async () => {
  const listItem1 = await db.collection('listItem').add(
    {
      itemName: 'milk',
      amount: 2,
      status: itemStatus.runningLow,
      createDate : FieldValue.serverTimestamp()
    }
  )
  const listItem2 = await db.collection('listItem').add(
    {
      itemName: 'bread',
      amount: 1,
      status: itemStatus.notComplete,
      createDate : FieldValue.serverTimestamp()
    }

    
    
  )

  const list = await db.collection('list').add({
    name: 'victory',
    user: "ffffff",
    items: FieldValue.arrayUnion(db.doc(`${listItem1.path}`), db.doc(`${listItem2.path}`)),
   
  });

  console.log(list);
}


func();
console.log('finish');
