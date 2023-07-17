const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
const { auth, requiresAuth } = require('express-openid-connect');

// Import the appropriate controller

// Define the routes
router.get('/', requiresAuth(), recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipeById);
router.post('/', recipesController.createRecipe);
router.put('/:id', recipesController.updateRecipeById);
router.delete('/:id', recipesController.deleteRecipeById);

module.exports = router;