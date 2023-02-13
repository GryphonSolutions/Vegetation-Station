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
  const docRef = doc(db, 'chats', parameters);
  try {
    const data = await getDoc(docRef);
    return Promise.resolve(data.data());
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
  const { id, currentCombinedId, read, text, time } = parameters;
  const docRef = doc(db, 'chats', id);

  if (!time) {
    try {
      await updateDoc(docRef, {
        [`${currentCombinedId}.lastMessage`]: text,
        [`${currentCombinedId}.read`]: read,
      });
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  } else {
    try {
      await updateDoc(docRef, {
        [`${currentCombinedId}.lastMessage`]: text,
        [`${currentCombinedId}.date`]: serverTimestamp(),
        [`${currentCombinedId}.read`]: read,
      });
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
};
