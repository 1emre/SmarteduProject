const Category = require('../models/Category');

exports.getAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    console.log(`Could not fetch Categories ${error}`);
  }
};

exports.getCategoryWithSlug = async (categorySlug) => {
  try {
    const category = await Category.findOne({ slug: categorySlug });
    return category;
  } catch (error) {
    console.log(`Could not fetch Category with slug ${error}`);
  }
};

exports.createCategoryWithBody = async (body) => {
  try {
    const category = await Category.create(body);
    return category;
  } catch (error) {
    console.log(`Could not crate Category ${error}`);
  }
};

exports.deleteCategoryWithID = async (userID) => {
  try {
    const category = await Category.findByIdAndRemove(userID);
    return category;
  } catch (error) {
    console.log(`Could not crate Category ${error}`);
  }
};
