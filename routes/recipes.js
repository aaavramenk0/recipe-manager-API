const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

router.post('/api/recipes', recipeController.createRecipe);
router.get('/api/recipes', recipeController.getAllRecipes);
router.get('/api/recipes/:recipeId', recipeController.getRecipeById);
router.put('/api/recipes/:recipeId', recipeController.updateRecipeById);
router.delete('/api/recipes/:recipeId', recipeController.deleteRecipeById);

module.exports = router;