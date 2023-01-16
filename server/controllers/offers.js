const {
  offersModel: {
    getFromOffersDB,
    postToOffersDB,
    updateOffersDB,
    deleteFromOffersDB,
  },
} = require('../models');

module.exports.getFromOffers = async (req, res) => {
  try {
    const data = await getFromOffersDB();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports.postToOffers = async (req, res) => {
  try {
    await postToOffersDB(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.updateOffers = async (req, res) => {
  try {
    await updateOffersDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.deleteFromOffers = async (req, res) => {
  try {
    await deleteFromOffersDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
