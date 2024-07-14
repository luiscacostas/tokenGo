const monumentService = require('../services/monument.services');

const getAllMonuments = async (req, res) => {
  try {
    const monuments = await monumentService.getAllMonuments();
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
  try {
    const monumentData = req.body;
    const monument = await monumentService.createMonument(monumentData);
    res.status(201).json(monument);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports = {
  getAllMonuments,
  getMonumentByName,
  createMonument,
  updateMonument,
  desactivateMonument
};