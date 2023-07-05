const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/recipes', require('./recipes'));
router.use('/authors', require('./authors'));

router.use('/user', require('./signup'))
router.use('/user', require('./login'))

module.exports = router;