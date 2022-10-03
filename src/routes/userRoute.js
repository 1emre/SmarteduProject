const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),
    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists!');
          }
        });
      }),
    body('password').not().isEmpty().withMessage('Please Enter A Password'),
  ],
  authController.createUser
); // http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser); // http://localhost:3000/users/login
router.route('/logout').get(authController.logoutUser); // http://localhost:3000/users/logout -- login ile farkı login sayfasına giderken pageRoute.js kullanıyor
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); // http://localhost:3000/users/dashboard  || login olunmadıysa login sayfasına yönlendirmek icin middleware kullanıyoruz
router.route('/:id').delete(authController.deleteUser);

module.exports = router;
