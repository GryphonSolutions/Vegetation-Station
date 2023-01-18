const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} = require('firebase/firestore');
const { db, chatsCol, chatMessagesCol } = require('../database');

module.exports.getFromChatsDB = async (parameters) => {
  try {
    // Query Here
    const data = await getDocs();
    return Promise.resolve(data);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.postToChatsDB = async (parameters) => {
  try {
    // Query Here
    await setDoc();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.updateChatsDB = async (parameters) => {
  try {
    // Query Here
    await updateDoc();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.deleteFromChatsDB = async (parameters) => {
  try {
    // Query Here
    await deleteDoc();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
