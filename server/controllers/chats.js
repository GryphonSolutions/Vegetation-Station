const {
  chatsModel: {
    getFromChatsDB,
    postToChatsDB,
    updateChatsDB,
    deleteFromChatsDB,
  },
} = require('../models');

module.exports.getFromChats = async (req, res) => {
  console.log('GET CHATS', req.query);
  const id = req.query.activeUser;
  try {
    const data = await getFromChatsDB(id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports.postToChats = async (req, res) => {
  console.log('POST CHATS ', req.body.params);
  try {
    await postToChatsDB(req.body.params);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.updateChats = async (req, res) => {
  console.log('UPDATE CHATS ', req.body.params);
  try {
    await updateChatsDB(req.body.params);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
