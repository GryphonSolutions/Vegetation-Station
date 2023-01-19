const {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} = require('firebase/firestore');
const { db, chatsCol, chatMessagesCol } = require('../database');

module.exports.getFromChatsDB = async (parameters) => {
  console.log('Chats model');
  const allDocs = [];
  try {
    const data = await getDocs(chatsCol);
    data.forEach((document) => {
      allDocs.push(document.data());
    });
    return Promise.resolve(allDocs);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports.postToChatsDB = async (parameters) => {
  const { combinedId } = parameters;
  try {
    await updateDoc(doc(chatsCol, parameters.id), {
      [`${combinedId}.chattingWith`]: {
        id: parameters.userId,
        profilePicture: parameters.profilePicture,
        username: parameters.username,
      },
      [`${combinedId}.date`]: serverTimestamp(),
      [`${combinedId}.id`]: parameters.id,
      [`${combinedId}.lastMessage`]: '',
      [`${combinedId}.read`]: true,
    });
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
