const {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
} = require('firebase/firestore');
const { db, chatsCol, chatMessagesCol } = require('../database');

module.exports.getFromMessagesDB = async (parameters) => {
  const docRef = doc(db, 'chatMessages', parameters);
  try {
    const data = await getDoc(docRef);
    return Promise.resolve(data.data());
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.postToMessagesDB = async (parameters) => {
  const id = parameters;
  try {
    await setDoc(doc(db, 'chatMessages', id), { messages: [] });
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.updateMessagesDB = async (parameters) => {
  const { senderId, text, combinedId } = parameters;
  const docRef = doc(db, 'chatMessages', combinedId);
  try {
    await updateDoc(docRef, {
      messages: arrayUnion({
        id: String(new Date().getTime()),
        text,
        senderId,
        date: String(new Date().getTime()),
      }),
    });
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
