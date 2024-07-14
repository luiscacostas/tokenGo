const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routes.controllers');
const authMiddleware = require('../middlewares/auth');
const {createRouteValidation} = require('../validators/routes.validators')
const validate = require('../middlewares/validate')

router.get('/', authMiddleware, routeController.getAllRoutes);

router.get('/user/:userId',authMiddleware, routeController.getRoutesByUser);

router.post(
    '/',
    authMiddleware,
    createRouteValidation,
    validate, 
    routeController.createRoute);

module.exports = router;
