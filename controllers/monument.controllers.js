const monumentService = require('../services/monument.services');

const getAllMonuments = async (req, res) => {
  //const userId = req.user.id;
  try {
    const monuments = await monumentService.getAllMonuments();
    res.status(200).json(monuments);
  } catch (error) {
    console.error('Error fetching monuments:', error);
    res.status(500).json({ error: 'Error fetching monuments' });
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
  const userId = req.user.id;

  try {
    const result = await monumentService.captureMonument(monumentId, userId);
    res.status(200).json({ message: 'Monument captured', monument: result });
  } catch (error) {
    console.error('Error capturing monument:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllMonuments,
  getMonumentByName,
  createMonument,
  updateMonument,
  desactivateMonument,
  captureMonument
};
