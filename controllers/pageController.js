const nodemailer = require('nodemailer');
const Courses = require('../models/Course');
const Users = require('../models/User');

exports.getIndexPage = async (req, res) => {
  const courses = await Courses.find().sort('-createDate').limit(2);
  const totalStudents = await Users.countDocuments({ role: 'student' });
  const totalCourses = await Courses.find().countDocuments();
  const totalTeachers = await Users.countDocuments({ role: 'teacher' });
  res.status(200).render('index', {
    courses,
    totalStudents,
    totalCourses,
    totalTeachers,
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendMail = async (req, res) => {
  try {
    // htmlden gelen body nin name alanlarının degerlerini alıyorum
    const outputMessage = `

  <h1>Mail Details </h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'emredmrbs99@gmail.com', // gmail account
        pass: 'qfplpgsqupcnyurp', // gmail password -- uygulama şifrelerinden yeni şifre aldım
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart EDU Contact Form" <emredmrbs99@gmail.com>', // sender address
      to: 'emredmrbs99@gmail.com', // list of receivers
      subject: 'Smart EDU Contact From New Message', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'We received your message successfully'); // contact templete redirect ediyorum ve bunu orda yakalamam
    //lazım nasıl yakılıyorum app.js olusturdugum flasMessage değişkeniyle yakalıyorum.

    res.status(200).redirect('/contact');
  } catch (error) {
    //req.flash('error', `Something happened! ${err}`);
    req.flash('error', `Something happened!`);
    res.status(400).redirect('/contact');
  }
};
