const {
  chatsModel: {
    getFromChatsDB,
    postToChatsDB,
    updateChatsDB,
    deleteFromChatsDB,
  },
} = require('../models');

module.exports.getFromChats = async (req, res) => {
  try {
    const data = await getFromChatsDB();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports.postToChats = async (req, res) => {
  try {
    await postToChatsDB(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.updateChats = async (req, res) => {
  try {
    await updateChatsDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.deleteFromChats = async (req, res) => {
  try {
    await deleteFromChatsDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
