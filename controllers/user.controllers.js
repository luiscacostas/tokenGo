const userService = require('../services/user.services');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserLoginStatus = async (req, res) => {
  const { userId } = req.params;
  const { isLoggedIn } = req.body;
  try {
    const updatedUser = await userService.updateUserLoginStatus(userId, isLoggedIn);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const desactivateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await userService.desactivateUser(userId);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateUserPassword = async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    const updatedUser = await userService.updateUserPassword(userId, oldPassword, newPassword);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUserLoginStatus,
  desactivateUser,
  updateUserPassword
};
