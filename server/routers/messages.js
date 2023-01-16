const messagesRouter = require('express').Router();
const {
  messagesController: {
    getFromMessages,
    postToMessages,
    updateMessages,
    deleteFromMessages,
  },
} = require('../controllers');

messagesRouter.get('/data', getFromMessages);

messagesRouter.post('/data', postToMessages);

messagesRouter.patch('/data', updateMessages);

messagesRouter.delete('/data', deleteFromMessages);

module.exports = messagesRouter;
