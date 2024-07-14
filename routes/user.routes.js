const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth');

router.get('/', userController.getAllUsers);

router.get('/:email', userController.getUserByEmail);

router.post('/', userController.createUser);

router.put('/status/:userId', userController.updateUserLoginStatus);

router.delete('/desactivate/:userId', userController.desactivateUser);

router.put('/password/:userId', userController.updateUserPassword);

module.exports = router;