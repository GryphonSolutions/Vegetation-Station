const offersRouter = require('express').Router();
const {
  offersController: {
    getFromOffers,
    postToOffers,
    updateOffers,
    deleteFromOffers,
  },
} = require('../controllers');

offersRouter.get('/archive', getFromOffers);

offersRouter.post('/archive', postToOffers);

offersRouter.patch('/archive', updateOffers);

offersRouter.delete('/archive', deleteFromOffers);

module.exports = offersRouter;
