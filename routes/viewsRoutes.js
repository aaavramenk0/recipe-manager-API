const viewsController = require('../controllers/viewsController');

const router = require('express').Router();

router.get('/', viewsController.buildRecipeView);
router.get('/authors', viewsController.buildAuthorView);

router.get('/recipe-detail/:id', viewsController.buildRecipeDetailView);
router.get('/author-detail/:id', viewsController.buildAuthorDetailView);



module.exports = router;