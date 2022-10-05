const User = require('../models/User');

exports.createUser = async (body) => {
  try {
    const user = await User.create(body);
    return user;
  } catch (error) {
    console.log(`Could not create User ${error}`);
  }
};

exports.getUsersAll = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(`Could not fetch User ${error}`);
  }
};

exports.getUsersCountWithRole = async (role) => {
  try {
    const totalUsers = await User.countDocuments({ role: role });
    return totalUsers;
  } catch (error) {
    console.log(`Could not fetch User ${error}`);
  }
};

exports.getUserWithId = async (sessionId) => {
  try {
    const user = await User.findById(sessionId);
    return user;
  } catch (error) {
    console.log(`Could not fetch User ${error}`);
  }
};

exports.getUserWithEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log(`Could not fetch User with Email ${error}`);
  }
};

exports.getUserAndCoursesWithId = async (sessionId) => {
  try {
    const user = await User.findOne({ _id: sessionId }).populate('courses');
    return user;
  } catch (error) {
    console.log(`Could not fetch User with Email ${error}`);
  }
};

exports.deleteUserWithID = async (userID) => {
  try {
    const user = await User.findByIdAndRemove(userID);
    return user;
  } catch (error) {
    console.log(`Could not fetch User with Email ${error}`);
  }
};
