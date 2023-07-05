const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authors');

router.get('/', authorController.getAll);

router.post('/', authorController.createAuthor);

router.delete('/:_id', authorController.deleteAuthor);


module.exports = router;