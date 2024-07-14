const { body } = require('express-validator');

const createMonumentValidation = [
  body('name')
  .not()
  .isEmpty()
  .withMessage('Name is required'),
  body('city')
  .not()
  .isEmpty()
  .withMessage('City is required'),
  body('location')
  .isObject()
  .withMessage('Location must be an object with latitude and longitude'),
  body('location.coordinates')
  .isArray({ min: 2, max: 2 })
  .withMessage('Coordinates must be an array with latitude and longitude')
];

module.exports = {
  createMonumentValidation
};