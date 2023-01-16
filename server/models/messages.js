const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} = require('firebase/firestore');
const { db, messagesCol } = require('../database');

module.exports.getFromMessagesDB = async (parameters) => {
  try {
    // Query Here
    const data = await getDocs();
    return Promise.resolve(data);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.postToMessagesDB = async (parameters) => {
  try {
    // Query Here
    await setDoc();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.updateMessagesDB = async (parameters) => {
  try {
    // Query Here
    await updateDoc();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.deleteFromMessagesDB = async (parameters) => {
  try {
    // Query Here
    await deleteDoc();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
