const catalogRouter = require('express').Router();
const {
  catalogController: {
    getFromCatalog,
    postToCatalog,
    updateCatalog,
    deleteFromCatalog,
  },
} = require('../controllers');

catalogRouter.get('/listings', getFromCatalog);

catalogRouter.post('/listings', postToCatalog);

catalogRouter.patch('/listings', updateCatalog);

catalogRouter.delete('/listings', deleteFromCatalog);

module.exports = catalogRouter;
