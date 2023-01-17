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

// Currently querying all data, refactor if need to specify data
module.exports.getFromOffersDB = async (params) => {
  const allDocs = [];
  try {
    const data = await getDocs(offersCol);
    data.forEach((document) => {
      allDocs.push(document.data());
    });
    return Promise.resolve(allDocs);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// Pass in buyer object and seller object
module.exports.postToOffersDB = async ({ buyer, seller }) => {
  try {
    await setDoc(
      doc(offersCol, String(buyer.id) + String(seller.id)),
      { buyer, seller, isOpen: true, reason: '' },
    );
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// Pass in Offers object
module.exports.updateOffersDB = async (params) => {
  try {
    await updateDoc(doc(offersCol, String(params.buyer.id) + String(params.seller.id)), params);
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// Pass in Offers object
module.exports.deleteFromOffersDB = async (params) => {
  try {
    await deleteDoc(doc(offersCol, String(params.buyer.id) + String(params.seller.id)));
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
