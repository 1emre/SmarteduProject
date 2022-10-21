const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (name, description, category, user) => {
  try {
    const course = Course.create({
      name: name,
      description: description,
      category: category,
      user: user,
    });
    return course;
  } catch (error) {
    console.log(`Could not create Course ${error}`);
  }
};

const csQuery = (filter) => {
  return {
    $or: [
      { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } }, // searchden gelen kısmı kucuk harfe cevir
      { category: filter.category },
    ],
  };
};

exports.getFilterCourses = async (filter) => {
  try {
    const courses = Course.find(csQuery(filter))
      .sort('-createDate')
      .populate('user'); // filter i burda where kosulu olarak kullandıgımız ıcın yazdık
    return courses;
  } catch (error) {
    console.log(`Could not fetch Course ${error}`);
  }
};

exports.getCourseAndUsersWithSlug = async (slug) => {
  try {
    const course = await Course.findOne({ slug: slug }).populate('user'); // course modelimin icinde user ı modelim refere edildigi icin joinleyip course icinden usera ulaştım.
    return course;
  } catch (error) {
    console.log(`Could not fetch Course and Users ${error}`);
  }
};

// exports.enrollSerCourse = async (sessionUserID, body) => {
//   try {
//     const user = await User.findById(sessionUserID);
//     await user.courses.push({ _id: body.course_id }); //course sayfasından enroll edildigin de input alanında gelen name yani course_id ye karsılık gelen course._id yi aldık
//     await user.save();
//     return user;
//   } catch (error) {
//     console.log(`Could not enroll to Course ${error}`);
//   }
// };

exports.releaseSerCourse = async (sessionUserID, courseId) => {
  try {
    const user = await User.findById(sessionUserID);
    user.courses.pull({ _id: courseId }); //course sayfasından enroll edildigin de input alanında gelen name yani course_id ye karsılık gelen course._id yi aldık
    await user.save();
    return user;
  } catch (error) {
    console.log(`Could not release to Course ${error}`);
  }
};

exports.deleteCourseWithSlug = async (slug) => {
  try {
    const course = await Course.findOneAndRemove({ slug: slug });
    return course;
  } catch (error) {
    console.log(`Could not delete to Course ${error}`);
  }
};

exports.deleteCourseWithID = async (userID) => {
  try {
    const course = await Course.deleteMany({ user: userID });
    return course;
  } catch (error) {
    console.log(`Could not delete to Course ${error}`);
  }
};

exports.updateCourseWithSlug = async (slug, body) => {
  try {
    const course = await Course.findOne({ slug: slug });
    course.name = body.name;
    course.description = body.description;
    course.category = body.category;
    course.save();
    return course;
  } catch (error) {
    console.log(`Could not update to Course ${error}`);
  }
};

exports.getCoursesWithSessionIDSortCD = async (sessionID) => {
  try {
    const courses = await Course.find({ user: sessionID }).sort('-createDate');
    return courses;
  } catch (error) {
    console.log(`Could not get to Course with sessionID sort ${error}`);
  }
};

exports.getCoursesLimit = async (limit = 2) => {
  try {
    const courses = await Course.find().sort('-createDate').limit(limit);
    return courses;
  } catch (error) {
    console.log(`Could not get to Course with sessionID sort ${error}`);
  }
};

exports.getCourseCount = async () => {
  try {
    const courses = await Course.find().countDocuments();
    return courses;
  } catch (error) {
    console.log(`Could not get to Course with sessionID sort ${error}`);
  }
};
