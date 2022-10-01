const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories; // linkten gelen categories parametresine karsılık değeri alıyorum.
    const query = req.query.search;
    const category = await Category.findOne({ slug: categorySlug }); // slug seklinde gelicege icin oradan esledim
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id }; // burdaki category Course modeline ait olan parametre
    }
    if (query) {
      filter = { name: query };
    }
    if (!query && !categorySlug) {
      (filter.name = ''), (filter.category = null);
    }
    const courses = await Course.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } }, // searchden gelen kısmı kucuk harfe cevir
        { category: filter.category },
      ],
    })
      .sort('-createDate')
      .populate('user'); // filter i burda where kosulu olarak kullandıgımız ıcın yazdık
    const categories = await Category.find();
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
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    ); // course modelimin icinde user ı modelim refere edildigi icin joinleyip course icinden usera ulaştım.
    const categories = await Category.find();
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
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    req.flash('success', `${course.name} has been created successfully.`);
    res.status(201).redirect('/courses');
  } catch (error) {
    req.flash('error', `Something happened!`);
    res.status(400).redirect('/courses');
  }
};

exports.enrollCourse = async (req, res) => {
  try {
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
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id }); //course sayfasından enroll edildigin de input alanında gelen name yani course_id ye karsılık gelen course._id yi aldık
    await user.save();

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
    const course = await Course.findOneAndRemove({ slug: req.params.slug });
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
    const course = await Course.findOne({ slug: req.params.slug });
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save();
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
