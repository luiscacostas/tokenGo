const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const validate = require('../middlewares/validate')
const {registerValidation, loginValidation} = require('../validators/auth.validators')

router.post(
    '/register',
    authController.register);

router.post(
    '/login',
    authController.login);

module.exports = router;