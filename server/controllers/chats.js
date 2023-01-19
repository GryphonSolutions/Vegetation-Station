const {
  chatsModel: {
    getFromChatsDB,
    postToChatsDB,
    updateChatsDB,
    deleteFromChatsDB,
  },
} = require('../models');

module.exports.getFromChats = async (req, res) => {
  console.log('Chats Controller');
  try {
    const data = await getFromChatsDB();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports.postToChats = async (req, res) => {
  console.log(req.body.params);
  try {
    await postToChatsDB(req.body.params);
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
