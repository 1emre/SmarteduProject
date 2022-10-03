//login olundugunda register ve login sayfalarına gidilmemesi icin

module.exports = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect('/');
  }
  next();
};
