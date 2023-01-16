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
    const snapshot = await getDocs(plantsCol);
    const allDocs = [];
    snapshot.forEach((document) => {
      allDocs.push(document.data());
    });
    return Promise.resolve(allDocs);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
