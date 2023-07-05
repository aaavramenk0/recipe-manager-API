const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);
router.get('/:_id', recipesController.getRecipe);

router.post('/', recipesController.createRecipe);

router.put('/:_id', recipesController.updateRecipe);

router.delete('/:_id', recipesController.deleteRecipe);

module.exports = router;