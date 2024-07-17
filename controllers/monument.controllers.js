const monumentService = require('../services/monument.services');

const getAllMonuments = async (req, res) => {
  try {
    const userId = req.user._id;
    const monuments = await monumentService.getAllMonuments(userId);
    res.status(200).json(monuments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMonumentByName = async (req, res) => {
  const { name } = req.params;
  try {
    const monument = await monumentService.getMonumentByName(name);
    if (!monument) {
      return res.status(404).json({ message: 'Monumento no encontrado' });
    }
    res.status(200).json(monument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMonument = async (req, res) => {
  const { name, city, latitude, longitude, icon } = req.body;

  try {
    const result = await monumentService.createMonument(name, city, latitude, longitude, icon);
    res.status(201).json({ message: 'Monument añadido', monument: result });
  } catch (error) {
    console.error('Error añadiendo monumento:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateMonument = async (req, res) => {
  const { monumentId } = req.params;
  const updateData = req.body;
  try {
    const updatedMonument = await monumentService.updateMonument(monumentId, updateData);
    if (!updatedMonument) {
      return res.status(404).json({ message: 'Monumento no encontrado' });
    }
    res.status(200).json(updatedMonument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const desactivateMonument = async (req, res) => {
  const { monumentId } = req.params;
  try {
    const updatedMonument = await monumentService.desactivateMonument(monumentId);
    if (!updatedMonument) {
      return res.status(404).json({ message: 'Monumento no encontrado' });
    }
    res.status(200).json(updatedMonument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const captureMonument = async (req, res) => {
  const { monumentId } = req.body;
  const userId = req.user._id;

  try {
    const result = await monumentService.captureMonument(monumentId, userId);
    res.status(200).json({ message: 'Monument captured', monument: result });
  } catch (error) {
    console.error('Error capturing monument:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
const getAllMonumentsForUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { allMonuments, capturedMonumentIds } = await monumentService.getAllMonumentsForUser(userId);
    res.status(200).json({ allMonuments, capturedMonumentIds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMonuments,
  getMonumentByName,
  createMonument,
  updateMonument,
  desactivateMonument,
  captureMonument,
  getAllMonumentsForUser
};
