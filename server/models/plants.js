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
  const allDocs = [];
  try {
    const snapshot = await getDocs(plantsCol);
    snapshot.forEach((document) => {
      allDocs.push(document.data());
    });
    return Promise.resolve(allDocs);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
