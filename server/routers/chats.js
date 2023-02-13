const chatsRouter = require('express').Router();
const {
  chatsController: { getFromChats, postToChats, updateChats, deleteFromChats },
} = require('../controllers');

chatsRouter.get('/data', getFromChats);

chatsRouter.post('/data', postToChats);

chatsRouter.patch('/data', updateChats);

module.exports = chatsRouter;
