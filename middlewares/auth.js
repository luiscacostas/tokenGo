const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const authMiddleware = async (req, res, next) => {
  try {
    console.log('Headers:', req.headers);
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error('No Authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Received token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;