const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} = require('firebase/firestore');
const { db, plantsCol } = require('../database');

module.exports.getFromPlantsDB = async (parameters) => {
  try {
    // Query Here
    const data = await getDocs();
    return Promise.resolve(data);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
