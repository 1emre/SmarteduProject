const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Connect Db
// mongoose local
//   .connect('mongodb://localhost/smartedu-db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('DB Connected Successfully');
//   });
//connect DB
mongoose
  .connect(
    'mongodb+srv://dpedemirbas:admin@mongode.b9b53vk.mongodb.net/smartedu-db?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
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
    //store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://dpedemirbas:admin@mongode.b9b53vk.mongodb.net/smartedu-db?retryWrites=true&w=majority',
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

const port = 3000; //local
//const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
