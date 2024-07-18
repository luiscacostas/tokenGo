const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monument.controllers');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, monumentController.getAllMonuments);

router.get('/:name', monumentController.getMonumentByName);

router.post('/add', authMiddleware, monumentController.createMonument);

router.put('/:monumentId', authMiddleware, monumentController.updateMonument);

router.delete('/:monumentId', authMiddleware, monumentController.deactivateMonument);

router.post('/capture', authMiddleware, monumentController.captureMonument);

module.exports = router;