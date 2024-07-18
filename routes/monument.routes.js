const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monument.controllers');
const authMiddleware = require('../middlewares/auth');

router.get('/monuments', authMiddleware, monumentController.getAllMonuments);

router.get('/monuments/:name', monumentController.getMonumentByName);

router.post('/monuments', authMiddleware, monumentController.createMonument);

router.put('/monuments/:monumentId', authMiddleware, monumentController.updateMonument);

router.delete('/monuments/:monumentId', authMiddleware, monumentController.deactivateMonument);

router.post('/monuments/capture', authMiddleware, monumentController.captureMonument);

module.exports = router;