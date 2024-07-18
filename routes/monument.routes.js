const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monument.controllers');
const authMiddleware = require('../middlewares/auth');

router.get('/', monumentController.getAllMonuments);

router.get('/:name', monumentController.getMonumentByName);

router.post('/add', monumentController.createMonument);

router.put('/:monumentId', monumentController.updateMonument);

router.delete('/:monumentId', monumentController.deactivateMonument);

router.post('/capture', monumentController.captureMonument);

module.exports = router;