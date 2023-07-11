const viewsController = require('../controllers/viewsController');

const router = require('express').Router();

router.get('/', viewsController.buildRecipeView);

router.get('/recipe-detail/:id', viewsController.buildRecipeDetailView);



module.exports = router;