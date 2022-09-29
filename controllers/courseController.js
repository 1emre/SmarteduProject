const Course = require('../models/Course');
const Category = require('../models/Category');

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories; // linkten gelen categories parametresine karsılık değeri alıyorum.
    const category = await Category.findOne({ slug: categorySlug }); // slug seklinde gelicege icin oradan esledim
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id }; // burdaki category Course modeline ait olan parametre
    }
    const courses = await Course.find(filter).sort('-createDate'); // filter i burda where kosulu olarak kullandıgımız ıcın yazdık
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
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    ); // course modelimin icinde user ı modelim refere edildigi icin joinleyip course icinden usera ulaştım.
    res.status(200).render('course', {
      course,
      page_name: 'courses',
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

    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
