const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');

router.post('/api/categories', categoryController.createCategory);
router.get('/api/categories', categoryController.getCategories);
router.get('/api/categories/:categoryId', categoryController.getCategory);
router.put('/api/categories/:categoryId', categoryController.updateCategory);
router.delete('/api/categories/:categoryId', categoryController.deleteCategory);

module.exports = router;
