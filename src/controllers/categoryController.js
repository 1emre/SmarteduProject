const Category = require('../models/Category');
const categoryService = require('../services/categoryService');

exports.createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategoryWithBody(req.body);
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategoryWithID(req.params.id);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
