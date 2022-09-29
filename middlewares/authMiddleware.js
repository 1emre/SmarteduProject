const User = require('../models/User');

//login olmadan dashborad sayfasına ulasılamaması ıcın
module.exports = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect('/login');
    next();
  });
};
