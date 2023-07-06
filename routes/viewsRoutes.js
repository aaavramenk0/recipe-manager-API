const viewsController = require('../controllers/viewsController');

const router = require('express').Router();

router.get('/', viewsController.buildRecipeView());


module.exports = router;