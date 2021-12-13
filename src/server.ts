import {db} from './firebase/firebaseApp'
console.log('aaaa');

const docRef = db.collection('users').doc('alovelace');

const func = async () => {
  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });
}


func();
console.log('finish');
