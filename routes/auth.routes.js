const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const validate = require('../middlewares/validate')
const {registerValidation, loginValidation} = require('../validators/auth.validators')

router.post(
    '/register',
    registerValidation,
    validate,
    authController.register);

router.post(
    '/login',
    loginValidation,
    validate, 
    authController.login);

module.exports = router;