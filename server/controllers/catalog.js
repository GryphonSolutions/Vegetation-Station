const {
  catalogModel: {
    getFromCatalogDB,
    postToCatalogDB,
    updateCatalogDB,
    deleteFromCatalogDB,
  },
} = require('../models');

module.exports.getFromCatalog = async (req, res) => {
  try {
    const data = await getFromCatalogDB();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports.postToCatalog = async (req, res) => {
  try {
    await postToCatalogDB(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.updateCatalog = async (req, res) => {
  try {
    await updateCatalogDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.deleteFromCatalog = async (req, res) => {
  try {
    await deleteFromCatalogDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
