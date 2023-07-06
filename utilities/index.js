const db = require('../models');
const Recipe = db.recipe;


// GET request that retrieves all recipes from the database
const renderRecipes = (req, res) => {
  try {
    Recipe.find({})
      .then((data) => {
        //console.log(data);
      return data;
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving recipes.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {renderRecipes}
