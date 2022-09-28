const express = require('express');
const categoryController = require('../controllers/categoryController');

const route = express.Router();

route.route('/').post(categoryController.createCategory); // http://localhost:3000/categories

module.exports = route;
