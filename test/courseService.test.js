const courseService = require('../src/services/courseService');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect(process.env.NODE_ENV_MONGO_URL);
});

test('the data is 5', async () => {
  const data = await courseService.getCourseCount();
  expect(data).toBe(5);
});

test('get getCoursesLimit', async () => {
  const data = await courseService.getCoursesLimit();
  expect(data);
});

test('get getCoursesWithSessionIDSortCD', async () => {
  const data = await courseService.getCoursesWithSessionIDSortCD();
  expect(data);
});

test('get updateCourseWithSlug', async () => {
  const data = await courseService.updateCourseWithSlug();
  expect(data);
});

test('get deleteCourseWithID', async () => {
  const data = await courseService.deleteCourseWithID();
  expect(data);
});

test('get deleteCourseWithSlug', async () => {
  const data = await courseService.deleteCourseWithSlug();
  expect(data);
});
