const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  documentId,
} = require('firebase/firestore');
const {
  db,
  catalogCol,
  chatsCol,
  chatMessagesCol,
  offersCol,
  plantsCol,
  usersCol,
} = require('.');
const {
  plantData,
  userData,
  catalogData,
  chatsData,
  chatMessagesData,
  offersData,
} = require('../data');

// Generate unique IDs
// console.log(new Date().getTime());

const verifySeeding = async (dbCol) => {
  try {
    const snapshot = await getDocs(dbCol);
    snapshot.forEach((document) => console.log(document.data()));
  } catch (err) {
    console.error(err);
  }
};

const testQuerying = async () => {
  const q = query(plantsCol, where(documentId(), '==', 'plant1'));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => console.log(document.id));
    querySnapshot.forEach((document) => console.log(document.data()));
  } catch (err) {
    console.error(err);
  }
};

const seedPlantCollection = async () => {
  try {
    const formattedPlantData = await plantData.reduce((acc, plant, idx) => {
      const id = String(new Date().getTime() + idx);
      console.log(id);
      const Plant = {};
      Plant.id = id.slice(id.length / 2, id.length);
      Plant.latinName = plant['Latin name'];
      Plant.commonName = plant['Common name'];
      Plant.lightTolered = plant['Light tolered'];
      Plant.lightIdeal = plant['Light ideal'];
      Plant.bloomingSeason = plant['Blooming season'];
      Plant.leafColors = plant['Color of leaf'];
      Plant.watering = plant.Watering;
      Plant.climate = plant.Climat;
      Plant.growth = plant.Growth;
      Plant.img = plant.img;
      Plant.pruning = plant.Pruning;
      Plant.temps = {
        max: plant['Temperature max']?.F || null,
        min: plant['Temperature min']?.F || null,
      };
      acc.push(Plant);
      return acc;
    }, []);
    formattedPlantData.forEach((plant, idx) => {
      const docRef = doc(db, `plants/${plant.id}`);
      setDoc(docRef, plant);
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Plants Seeded!');
  }
};

const seedUserCollection = async () => {
  try {
    userData.forEach((user, idx) => {
      const id = user.id.slice(user.id.length / 2, user.id.length) + idx;
      user.id = id;
      const docRef = doc(db, `users/${id}`);
      setDoc(docRef, user);
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Users Seeded!');
  }
};

const seedCatalogCollection = async () => {
  try {
    catalogData.forEach((listing, idx) => {
      const id =
        listing.id.slice(listing.id.length / 2, listing.id.length) + idx;
      listing.id = id;
      const docRef = doc(db, `catalog/${id}`);
      setDoc(docRef, listing);
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Catalog Seeded!');
  }
};

const seedChatsCollection = async () => {
  try {
    chatsData.forEach((chat) => {
      const docRef = doc(db, `chats/${chat.combinedId}`);
      setDoc(docRef, chat);
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Chats Seeded!');
  }
};

const seedChatMessagesCollection = async () => {
  try {
    chatMessagesData.forEach((messageData) => {
      const docRef = doc(db, `chatMessages/${messageData.combinedId}`);
      setDoc(docRef, messageData);
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Chat Messages Seeded!');
  }
};

const seedOffersCollection = async () => {
  try {
    offersData.forEach((offer) => {
      const docId = String(offer.buyer.listing) + String(offer.seller.listing);
      const docRef = doc(db, `offers/${docId}`);
      setDoc(docRef, offer);
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Offers Seeded!');
  }
};

// SEED DATABASE
// seedPlantCollection();
// seedUserCollection();
// seedCatalogCollection();
// seedChatsCollection();
// seedChatMessagesCollection();
// seedOffersCollection();
