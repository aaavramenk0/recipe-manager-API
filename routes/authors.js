const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

const authorController = require('../controllers/authors');

router.get('/',requiresAuth(),authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorById);
router.post('/', authorController.createAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;