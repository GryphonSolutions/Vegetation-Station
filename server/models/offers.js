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
  const allDocs = [];
  try {
    const snapshot = await getDocs(offersCol);
    snapshot.forEach((document) => {
      allDocs.push(document.data());
    });
    return Promise.resolve(allDocs);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.postToOffersDB = async ({ buyer, seller, buyerPlant, sellerPlant }) => {
  try {
    await setDoc(
      doc(offersCol),
      { buyer, seller, buyerPlant, sellerPlant, isOpen: true, reason: '' },
    );
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.updateOffersDB = async ({ id, reason }) => {
  try {
    await updateDoc(doc(offersCol, id), { reason });
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.deleteFromOffersDB = async ({ id }) => {
  try {
    await deleteDoc(doc(offersCol, id));
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
