const monumentService = require('../services/monument.services');

const getAllMonuments = async (req, res) => {
  try {
    const userId = req.user._id;
    const { availableMonuments, capturedMonuments } = await monumentService.getMonumentsForUser(userId);
    res.status(200).json({ availableMonuments, capturedMonuments });
  } catch (error) {
    console.error('Error al obtener todos los monumentos:', error);
    res.status(500).json({ error: 'Internal server error' });
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
    console.error('Error al obtener el monumento:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createMonument = async (req, res) => {
  const { name, city, latitude, longitude, icon } = req.body;

  if (!name || !city || !latitude || !longitude || !icon) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const result = await monumentService.createMonument(name, city, latitude, longitude, icon);
    res.status(201).json({ message: 'Monumento añadido', monument: result });
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
    console.error('Error al actualizar el monumento:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deactivateMonument = async (req, res) => {
  const { monumentId } = req.params;
  try {
    const updatedMonument = await monumentService.deactivateMonument(monumentId);
    if (!updatedMonument) {
      return res.status(404).json({ message: 'Monumento no encontrado' });
    }
    res.status(200).json(updatedMonument);
  } catch (error) {
    console.error('Error al desactivar el monumento:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const captureMonument = async (req, res) => {
  const { monumentId } = req.body;
  const userId = req.user._id;

  if (!monumentId) {
    return res.status(400).json({ message: 'Monument ID es obligatorio' });
  }

  try {
    const result = await monumentService.captureMonument(monumentId, userId);
    res.status(200).json({ message: 'Monumento capturado', monument: result });
  } catch (error) {
    console.error('Error al capturar el monumento:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllMonuments,
  getMonumentByName,
  createMonument,
  updateMonument,
  deactivateMonument,
  captureMonument
};