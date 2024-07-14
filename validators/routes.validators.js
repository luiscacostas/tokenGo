const { body } = require('express-validator');

const createRouteValidation = [
  body('user_id')
  .isMongoId()
  .withMessage('Invalid user ID'),
  body('city')
  .not()
  .isEmpty()
  .withMessage('City is required'),
  body('route')
  .isArray()
  .withMessage('Route must be an array of points'),
  body('route.*.timestamp')
  .isISO8601()
  .withMessage('Invalid timestamp'),
  body('route.*.location')
  .isObject()
  .withMessage('Location must be an object with latitude and longitude'),
  body('route.*.location.coordinates')
  .isArray({ min: 2, max: 2 })
  .withMessage('Coordinates must be an array with latitude and longitude')
];

module.exports = {
  createRouteValidation
};