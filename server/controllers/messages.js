const {
  messagesModel: {
    getFromMessagesDB,
    postToMessagesDB,
    updateMessagesDB,
    deleteFromMessagesDB,
  },
} = require('../models');

module.exports.getFromMessages = async (req, res) => {
  try {
    const data = await getFromMessagesDB();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports.postToMessages = async (req, res) => {
  try {
    await postToMessagesDB(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.updateMessages = async (req, res) => {
  try {
    await updateMessagesDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.deleteFromMessages = async (req, res) => {
  try {
    await deleteFromMessagesDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
