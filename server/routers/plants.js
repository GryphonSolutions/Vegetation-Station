const plantsRouter = require('express').Router();
const {
  plantsController: { getFromPlants },
} = require('../controllers');

plantsRouter.get('/details', getFromPlants);

module.exports = plantsRouter;
