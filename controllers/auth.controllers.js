const authService = require('../services/auth.services');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
  }

  try {
    const user = await authService.registerUser({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send({ status: "Error", message: "Error al registrar el usuario" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
  }

  try {
    const { token, user } = await authService.loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send({ status: "Error", message: "Error al iniciar sesión" });
  }
};

module.exports = {
  register,
  login
};