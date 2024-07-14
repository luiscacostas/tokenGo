const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monument.controllers');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, monumentController.getAllMonuments);

router.get('/:name', authMiddleware, monumentController.getMonumentByName);

router.post('/', authMiddleware, monumentController.createMonument);

router.put('/:monumentId', authMiddleware, monumentController.updateMonument);

router.delete('/desactivate/:monumentId', authMiddleware, monumentController.desactivateMonument);

module.exports = router;