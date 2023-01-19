const usersRouter = require('express').Router();
const {
  usersController: {
    getFromUsers,
    postToUsers,
    updateUsers,
    deleteFromUsers,
    getOneUser,
  },
} = require('../controllers');

usersRouter.get('/info', getFromUsers);

usersRouter.get('/info/:username', getOneUser);

usersRouter.post('/info', postToUsers);

usersRouter.patch('/info', updateUsers);

usersRouter.delete('/info', deleteFromUsers);

module.exports = usersRouter;
