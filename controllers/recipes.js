const db = require('../models');
const Recipe = db.recipe;

// POST request that create new recipe
module.exports.createRecipe = (req, res) => { 
  try {
    const name = req.body.name;
    if (!req.body.name) {
      res.status(400).send({ message: "Recipe name can not be empty!" });
      return
    }
    const recipe = new Recipe(req.body);
    recipe.save().then((data) => {
      console.log(data);
      res.status(200).send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occured while creating new recipe'
      })
    })
  } catch (err) {
    res.status(500).json(err);
  }
};
  
// GET request that retrieves all recipes from a database
module.exports.getAll = (req, res) => {
  try {
    Recipe.find({}).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving recipes.'
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
};

// GET request that retrieves recipe from a database by its ID
module.exports.getRecipe = (req, res) => {
  try {
    const _id = req.params._id;
    Recipe.find({ _id: _id }).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving recipe.'
      })
    })
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT request that retrieves recipe from a database by its ID
module.exports.updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params._id;
    if (!recipeId) {
      res.status(400).send({ message: 'Invalid Recipe ID Entered' });
      return;
    }
     
    Recipe.findOne({ _id: recipeId }, function (err, recipe) {
      recipe._id = req.params.recipeId;
      recipe.description = req.body.description;
      recipe.author = req.body.author;
      recipe.ingredients = req.body.ingredients;
      recipe.instructions = req.body.instructions;
      recipe.equipment = req.body.equipment;
      recipe.nutrition = req.body.nutrition;

      recipe.save().then(function (err, result) {
        
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the recipe.');
        } else {
          res.status(204).send(result);
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.deleteRecipe = async (req, res) => {
  try {
    const _id = req.params._id;
    if (!_id) {
      res.status(400).send({ message: 'Invalid Recipe ID Entered' });
      return;
    }
    Recipe.deleteOne({ _id: _id}).then( function (err, result) {
      if (!err) {
        res.status(500).json(err || 'Some error occurred while deleting the recipe.');
      } else {
        res.status(200).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the recipe.');
  }
};