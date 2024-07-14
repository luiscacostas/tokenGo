const User = require('../models/user.models');

/**
 * @exports services
 * @autor Luis Acosta
 * @namespace UserService
 */

/**
 * Descripción: Obtiene un usuario por su email
 * @memberof UserService 
 * @method getUserByEmail 
 * @async 
 * @param {string} userEmail - El email del usuario a buscar
 * @return {Object} - El objeto del usuario encontrado
 * @throws {Error} Error al obtener el usuario
 */
const getUserByEmail = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    console.error('Error al obtener el Usuario:', error);
    throw new Error('Error al obtener el Usuario');
  }
};

/**
 * Descripción: Obtiene todos los usuarios
 * @memberof UserService 
 * @method getAllUsers 
 * @async 
 * @return {Array} - Una lista de todos los usuarios
 * @throws {Error} Error al obtener los usuarios
 */
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error('Error al obtener los Usuarios:', error);
    throw new Error('Error al obtener los Usuarios');
  }
};

/**
 * Descripción: Crea un nuevo usuario
 * @memberof UserService 
 * @method createUser 
 * @async 
 * @param {JSON} userData - JSON con todos los campos para crear un usuario
 * @return {Object} - El objeto del usuario creado con todos sus campos
 * @throws {Error} Error al crear el usuario
 */
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw new Error('Error al crear el usuario');
  }
};

/**
 * Descripción: Actualiza el estado de inicio de sesión del usuario
 * @memberof UserService 
 * @method updateUserLoginStatus 
 * @async 
 * @param {string} userId - El ID del usuario
 * @param {boolean} isLoggedIn - Estado de inicio de sesión del usuario
 * @return {Object} - El objeto del usuario actualizado
 * @throws {Error} Error al actualizar el estado de inicio de sesión del usuario
 */
const updateUserLoginStatus = async (userId, isLoggedIn) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isLoggedIn: isLoggedIn, lastActive: Date.now() },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar el estado de inicio de sesión del usuario:', error);
    throw new Error('Error al actualizar el estado de inicio de sesión del usuario');
  }
};

/**
 * Descripción: Desactiva un usuario en lugar de eliminarlo físicamente
 * @memberof UserService 
 * @method desactivateUser 
 * @async 
 * @param {string} userId - El ID del usuario a desactivar
 * @return {Object} - El objeto del usuario desactivado
 * @throws {Error} Error al desactivar el usuario
 */
const desactivateUser = async (userId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.error('Error al desactivar el usuario:', error);
    throw new Error('Error al desactivar el usuario');
  }
};

/**
 * Descripción: Actualiza la contraseña de un usuario
 * @memberof UserService 
 * @method updateUserPassword 
 * @async 
 * @param {string} userId - El ID del usuario
 * @param {string} oldPassword - La contraseña anterior del usuario
 * @param {string} newPassword - La nueva contraseña del usuario
 * @return {Object} - El objeto del usuario actualizado
 * @throws {Error} Error al actualizar la contraseña del usuario
 */
const updateUserPassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new Error('La contraseña anterior no es correcta');
    }

    user.password = newPassword;
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar la contraseña del usuario:', error);
    throw new Error('Error al actualizar la contraseña del usuario');
  }
};

module.exports = {
  getUserByEmail,
  getAllUsers,
  createUser,
  updateUserLoginStatus,
  desactivateUser,
  updateUserPassword
};
// const newUser = {
//     name: 'Anana',
//     email: 'anana@gmail.com',
//     password: '12345asv',
//   };
  //createUser(newUser)
  //desactivateUser('6692b43a45ce26440dd54aa3')
  //createUser();
  //getUserByEmail('luisc@gmaildsd.com')
  //getAllUsers()
  //updateUserLoginStatus('6692b43a45ce26440dd54aa3', true)
  //updateUserPassword('6692843cf620d742909c96c3', '12345asv', 'casita123')

