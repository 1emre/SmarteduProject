const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const category = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
