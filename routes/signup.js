const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signup');

router.post('/signup', signupController.signupUser);



module.exports = router;