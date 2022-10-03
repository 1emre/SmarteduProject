const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
//login ve refister sayfalarına giriş yapıldıgında erişim olmaması icin middleware kullandım
router
  .route('/register')
  .get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendMail);

module.exports = router;
