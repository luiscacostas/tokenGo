const express = require('express');
const router = express.Router();
const monumentController = require('../controllers/monument.controllers');
const authMiddleware = require('../middlewares/auth');
const {createMonumentValidation} = require('../validators/monument.validators')
const validate = require('../middlewares/validate')

router.get('/', authMiddleware,monumentController.getAllMonuments);

router.get('/:name', authMiddleware, monumentController.getMonumentByName);

router.post(
    '/', 
    authMiddleware, 
    createMonumentValidation,
    validate,
    monumentController.createMonument);

router.put('/:monumentId', authMiddleware, monumentController.updateMonument);

router.delete('/desactivate/:monumentId', authMiddleware, monumentController.desactivateMonument);

module.exports = router;