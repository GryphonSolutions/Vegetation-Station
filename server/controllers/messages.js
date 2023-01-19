const {
  messagesModel: {
    getFromMessagesDB,
    postToMessagesDB,
    updateMessagesDB,
    deleteFromMessagesDB,
  },
} = require('../models');

module.exports.getFromMessages = async (req, res) => {
  console.log('GET MESSAGES ', req.query);
  const id = req.query.combinedId;
  try {
    const data = await getFromMessagesDB(id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports.postToMessages = async (req, res) => {
  console.log('POST MESSAGES ', req.body.params);
  const id = req.body.params.combinedId;
  try {
    await postToMessagesDB(id);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.updateMessages = async (req, res) => {
  console.log('UPDATE MESSAGES ', req.body.params);
  try {
    await updateMessagesDB(req.body.params);
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
