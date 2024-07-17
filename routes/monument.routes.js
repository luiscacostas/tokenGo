const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monument.controllers');
const authMiddleware = require('../middlewares/auth');
const { createMonumentValidation } = require('../validators/monument.validators');
const validate = require('../middlewares/validate');

router.get('/', monumentController.getAllMonuments);
router.get('/', authMiddleware, monumentController.getAllMonumentsForUser);
router.get('/:name', monumentController.getMonumentByName);
router.post('/capture', authMiddleware, monumentController.captureMonument);
router.post('/add', monumentController.createMonument);
router.put('/:monumentId', authMiddleware, monumentController.updateMonument);
router.delete('/desactivate/:monumentId', authMiddleware, monumentController.desactivateMonument);

module.exports = router;