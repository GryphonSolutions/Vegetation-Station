const {
  plantsModel: { getFromPlantsDB },
} = require('../models');

module.exports.getFromPlants = async (req, res) => {
  try {
    const data = await getFromPlantsDB();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
