const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} = require('firebase/firestore');
const { db, usersCol, chatsCol } = require('../database');

// Currently querying all data, refactor if need to specify data
module.exports.getFromUsersDB = async (params) => {
  const allDocs = [];
  try {
    const data = await getDocs(usersCol);
    data.forEach((document) => {
      allDocs.push(document.data());
    });
    return Promise.resolve(allDocs);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// Pass in Users object exculde id
module.exports.postToUsersDB = async (params) => {
  const user = String(new Date().getTime());
  const id = user.slice(user.length / 2, user.length) + 1;
  params.id = id;
  try {
    await setDoc(doc(usersCol, id), params);
    await setDoc(doc(chatsCol, id), {});
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// Pass in Users object
module.exports.updateUsersDB = async (params) => {
  try {
    await updateDoc(doc(usersCol, params.id), params);
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

// Pass in Users object
module.exports.deleteFromUsersDB = async (params) => {
  try {
    await deleteDoc(doc(usersCol, params.id));
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};
