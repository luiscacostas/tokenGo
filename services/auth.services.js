const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.models');
require('../config/db_mongo')

const registerUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    const usuarioRegistrado = await user.save();
    return usuarioRegistrado;
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw new Error('Error al registrar el usuario');
  }
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email:email });
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
  
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    console.log('JWT token:', token); 
    return { token, user };
  };
  
  module.exports = {
    registerUser,
    loginUser
  };