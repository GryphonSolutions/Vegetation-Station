const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} = require('firebase/firestore');

// Initialize our Application with config settings
const app = initializeApp({
  apiKey: 'AIzaSyCFKSjRJ-Kl4Bofq340QMYLF4LC39DBZnQ',
  authDomain: 'gryphon-4b818.firebaseapp.com',
  projectId: 'gryphon-4b818',
  storageBucket: 'gryphon-4b818.appspot.com',
  messagingSenderId: '142925851754',
  appId: '1:142925851754:web:f72932ba1ae13743a8ee13',
  measurementId: 'G-B0X72MKC6Q',
});

// Connection to Database
const db = getFirestore(app);

// References to Collections
const usersCol = collection(db, 'users');
const plantsCol = collection(db, 'plants');
const catalogCol = collection(db, 'catalogue');
const messagesCol = collection(db, 'messages');
const offersCol = collection(db, 'offers');

// Export Database and Collection references
module.exports = {
  db,
  usersCol,
  plantsCol,
  catalogCol,
  messagesCol,
  offersCol,
};

// Get User
// Create User - Also create a messages document based on UserID
// Edit User
// Delete User

// Get Plants

// Get Messages => based on UserID
// Post Messages - Given UserID, Message, timestamp, combinedID

// TESTING BELOW

// Document Reference
// const docRef = doc(db, 'test/users');
// const test = async () => {
//   try {
//     // Get the collection 'test' from our db
//     const colRef = collection(db, 'test');

//     // data to be set/updated/created - must be inside object
//     const docData = { users: ['thomas', 'mo', 'ryan'] };

//     // set/create a doc with passed in doc reference
//     setDoc(docRef, docData);

//     // delete a doc with passed in doc reference
//     // deleteDoc(docRef);

//     // Get documents for a collection reference
//     const snapshot = await getDocs(colRef);

//     // Extract data from snapshot(docs)
//     snapshot.forEach((docc) => console.log(docc.data()));
//   } catch (err) {
//     console.error(err);
//   }
// };

// test();
