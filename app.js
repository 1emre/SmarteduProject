const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./src/routes/pageRoute');
const courseRoute = require('./src/routes/courseRoute');
const categoryRoute = require('./src/routes/categoryRoute');
const userRoute = require('./src/routes/userRoute');

const app = express();

mongoose
  .connect(process.env.NODE_ENV_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

//Templete Engine
app.set('view engine', 'ejs');

//Global Variable
global.UserIN = null;

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.NODE_ENV_MONGO_URL,
    }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
//Routes
app.use('*', (req, res, next) => {
  UserIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
