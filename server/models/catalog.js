const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} = require('firebase/firestore');
const { db, catalogCol } = require('../database');

// Currently querying all data, refactor if need to specify data
module.exports.getFromCatalogDB = async (params) => {
  const allDocs = [];
  try {
    const data = await getDocs(catalogCol);
    data.forEach((document) => {
      allDocs.push(document.data());
    });
    return Promise.resolve(allDocs);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// Pass in Catalog object exclude id
module.exports.postToCatalogDB = async (params) => {
  const user = String(new Date().getTime());
  const id = user.slice(user.length / 2, user.length) + 1;
  params.id = id;
  try {
    await setDoc(doc(catalogCol, id), params);
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// Pass in Catalog object
module.exports.updateCatalogDB = async (params) => {
  try {
    await updateDoc(doc(catalogCol, params.id), params);
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// Pass in Catalog object
module.exports.deleteFromCatalogDB = async (params) => {
  try {
    await deleteDoc(doc(catalogCol, params.id));
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
