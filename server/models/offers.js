const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} = require('firebase/firestore');
const { db, offersCol } = require('../database');

module.exports.getFromOffersDB = async (parameters) => {
  try {
    // Query Here
    const data = await getDocs();
    return Promise.resolve(data);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.postToOffersDB = async (parameters) => {
  try {
    // Query Here
    await setDoc();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.updateOffersDB = async (parameters) => {
  try {
    // Query Here
    await updateDoc();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.deleteFromOffersDB = async (parameters) => {
  try {
    // Query Here
    await deleteDoc();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
