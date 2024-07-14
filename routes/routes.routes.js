const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routes.controllers');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, routeController.getAllRoutes);

router.get('/user/:userId',authMiddleware, routeController.getRoutesByUser);

router.post('/', authMiddleware, routeController.createRoute);

module.exports = router;
