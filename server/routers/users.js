const usersRouter = require('express').Router();
const {
  usersController: { getFromUsers, postToUsers, updateUsers, deleteFromUsers },
} = require('../controllers');

usersRouter.get('/info', getFromUsers);

usersRouter.post('/info', postToUsers);

usersRouter.patch('/info', updateUsers);

usersRouter.delete('/info', deleteFromUsers);

module.exports = usersRouter;
