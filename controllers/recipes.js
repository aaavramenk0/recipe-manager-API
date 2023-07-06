const db = require('../models');
const Recipe = db.recipe;

// POST request that creates a new recipe
module.exports.createRecipe = (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      return res.status(400).send({ message: "Recipe name cannot be empty!" });
    }
    const recipe = new Recipe(req.body);
    recipe.save()
      .then((data) => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while creating a new recipe.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET request that retrieves all recipes from the database
module.exports.getAllRecipes = (req, res) => {
  try {
    Recipe.find({})
      .then((data) => {
        res.send(data);
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

// GET request that retrieves a recipe from the database by its ID
module.exports.getRecipeById = (req, res) => {
  try {
    const _id = req.params.id;
    Recipe.findById(_id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: 'Recipe not found.' });
        }
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving the recipe.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT request that updates a recipe in the database by its ID
module.exports.updateRecipeById = (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).send({ message: 'Invalid Recipe ID entered.' });
    }

    Recipe.findByIdAndUpdate(_id, req.body, { new: true })
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: 'Recipe not found.' });
        }
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while updating the recipe.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE request that deletes a recipe from the database by its ID
module.exports.deleteRecipeById = (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).send({ message: 'Invalid Recipe ID entered.' });
    }

    Recipe.findByIdAndRemove(_id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: 'Recipe not found.' });
        }
        res.status(200).send({ message: 'Recipe deleted successfully.' });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while deleting the recipe.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};