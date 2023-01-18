const {
  usersModel: {
    getFromUsersDB,
    postToUsersDB,
    updateUsersDB,
    deleteFromUsersDB,
    getOneUser,
  },
} = require('../models');

module.exports.getFromUsers = async (req, res) => {
  try {
    const data = await getFromUsersDB();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports.getOneUser = async (req, res) => {
  const { username } = req.params;
  try {
    const oneUser = await getOneUser(username);
    res.send(oneUser);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.postToUsers = async (req, res) => {
  try {
    await postToUsersDB(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.updateUsers = async (req, res) => {
  try {
    await updateUsersDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.deleteFromUsers = async (req, res) => {
  try {
    await deleteFromUsersDB(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
