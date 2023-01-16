const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} = require('firebase/firestore');
const {
  db,
  catalogCol,
  messagesCol,
  offersCol,
  plantsCol,
  usersCol,
} = require('.');
const allPlantData = require('../data/exampleData');

const verifySeeding = async (dbCol) => {
  try {
    const snapshot = await getDocs(dbCol);
    const allDocs = [];
    snapshot.forEach((document) => {
      allDocs.push(document.data());
    });
  } catch (err) {
    console.error(err);
  }
};

const seedPlantCollection = async () => {
  try {
    const formattedPlantData = await allPlantData.reduce((acc, plant) => {
      const Plant = {};
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
      const docRef = doc(db, `plants/plant${idx}`);
      setDoc(docRef, plant);
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log('Plants Seeded!');
  }
};

// Seeding Function Calls
seedPlantCollection();
