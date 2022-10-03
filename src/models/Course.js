const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', //referans vermek istedigim modelin ismini yazıyorum
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

//Course modelim yaratılmadan once slug alanımı doldurmam gerekiyor
CourseSchema.pre('validate', function (next) {
  // arrow function kullanmamızın nedenı this kullandıgımız için
  this.slug = slugify(this.name, {
    //slug a neyi slugify ediceksin name yi
    lower: true, // name den slug e cevirirken kücült
    strict: true, // gereksiz karakterleri yok say String karakterlerden devam et
  });
  next(); // bir sonraki middware a geçmesi icin next() diyoruz
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
