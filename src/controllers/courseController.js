const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const categoryService = require('../services/categoryService');
const courseService = require('../services/courseService');
const userService = require('../services/userService');

const searchFilter = (categorySlug, category, query) => {
  return {
    name: query || '',
    category: categorySlug ? category._id : null,
  };
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories; // linkten gelen categories parametresine karsılık değeri alıyorum.
    const query = req.query.search;
    const category = await categoryService.getCategoryWithSlug(categorySlug);
    let filter = searchFilter(categorySlug, category, query);
    const courses = await courseService.getFilterCourses(filter);
    const categories = await categoryService.getAllCategories();
    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const user = await userService.getUserWithId(req.session.userID);
    const course = await courseService.getCourseAndUsersWithSlug(
      req.params.slug
    );
    const categories = await categoryService.getAllCategories();
    res.status(200).render('course', {
      course,
      page_name: 'courses',
      user,
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await courseService.createCourse(
      req.body.name,
      req.body.description,
      req.body.category,
      req.session.userID
    );
    req.flash('success', `${course.name} has been created successfully.`);
    res.status(201).redirect('/courses');
  } catch (error) {
    req.flash('error', `Something happened!`);
    res.status(400).redirect('/courses');
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    // const user = await userService.enrollSerCourse(
    //   req.session.userID,
    //   req.body
    // );
    const user = await User.findById(req.session.userID);
    await user.courses.push({ _id: req.body.course_id }); //course sayfasından enroll edildigin de input alanında gelen name yani course_id ye karsılık gelen course._id yi aldık
    await user.save();
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await courseService.releaseSerCourse(
      req.session.userID,
      req.body.course_id
    );

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourseWithSlug(req.params.slug);
    req.flash('error', `${course.name} has been removed successfully.`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await courseService.updateCourseWithSlug(
      req.params.slug,
      req.body
    );
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
