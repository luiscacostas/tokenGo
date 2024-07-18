const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routes.controllers');
const authMiddleware = require('../middlewares/auth');
const {createRouteValidation} = require('../validators/routes.validators')
const validate = require('../middlewares/validate')

router.get('/', routeController.getAllRoutes);

router.get('/user/:userId', routeController.getRoutesByUser);

router.post(
    '/',
    routeController.createRoute);

module.exports = router;
