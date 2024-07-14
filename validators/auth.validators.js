const { body } = require('express-validator');

const registerValidation = [
  body('name')
  .not()
  .isEmpty()
  .withMessage('Name is required'),
  body('email')
  .isEmail()
  .withMessage('Email is invalid'),
  body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email')
  .isEmail()
  .withMessage('Email is invalid'),
  body('password')
  .not().isEmpty()
  .withMessage('Password is required')
];

module.exports = {
  registerValidation,
  loginValidation
};