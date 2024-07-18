const Monument = require('../models/monument.models');
const User = require('../models/user.models');

const getAllMonuments = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const capturedMonumentIds = user.tokens.map(token => token.monument_id.toString());

    const allMonuments = await Monument.find();
    const availableMonuments = allMonuments.filter(monument => !capturedMonumentIds.includes(monument._id.toString()));
    const capturedMonuments = allMonuments.filter(monument => capturedMonumentIds.includes(monument._id.toString()));

    return { availableMonuments, capturedMonuments };
  } catch (error) {
    console.error('Error al obtener los monumentos:', error);
    throw new Error('Error al obtener los monumentos');
  }
};

const getMonumentByName = async (monumentName) => {
  try {
    const monument = await Monument.findOne({ name: monumentName });
    if (!monument) {
      throw new Error('Monumento no encontrado');
    }
    return monument;
  } catch (error) {
    console.error('Error al obtener el monumento:', error);
    throw new Error('Error al obtener el monumento');
  }
};

const createMonument = async (name, city, latitude, longitude, icon) => {
  try {
    const monumentData = {
      name,
      city,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      icon
    };
    
    const newMonument = new Monument(monumentData);
    await newMonument.save();
    return newMonument;
  } catch (error) {
    console.error('Error al crear el monumento:', error);
    throw new Error('Error al crear el monumento');
  }
};

const updateMonument = async (monumentId, updateData) => {
  try {
    const updatedMonument = await Monument.findByIdAndUpdate(monumentId, updateData, { new: true });
    if (!updatedMonument) {
      throw new Error('Monumento no encontrado');
    }
    return updatedMonument;
  } catch (error) {
    console.error('Error al actualizar el monumento:', error);
    throw new Error('Error al actualizar el monumento');
  }
};

const desactivateMonument = async (monumentId) => {
  try {
    const updatedMonument = await Monument.findByIdAndUpdate(monumentId, { isActive: false }, { new: true });
    if (!updatedMonument) {
      throw new Error('Monumento no encontrado');
    }
    return updatedMonument;
  } catch (error) {
    console.error('Error al desactivar el monumento:', error);
    throw new Error('Error al desactivar el monumento');
  }
};

const captureMonument = async (monumentId, userId) => {
  const monument = await Monument.findById(monumentId);
  if (!monument) {
    throw new Error('Monument not found');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const alreadyCaptured = user.tokens.some(token => token.monument_id.toString() === monumentId);
  if (alreadyCaptured) {
    throw new Error('Monument already captured');
  }

  user.tokens.push({ monument_id: monumentId, collected_at: new Date() });
  await user.save();

  return monument;
};

const getMonumentsForUser = async (userId) => {
  const user = await User.findById(userId).populate('tokens.monument_id');

  if (!user) {
    throw new Error('User not found');
  }

  const capturedMonumentIds = user.tokens.map(token => token.monument_id._id);
  const availableMonuments = await Monument.find({ _id: { $nin: capturedMonumentIds } });
  const capturedMonuments = await Monument.find({ _id: { $in: capturedMonumentIds } });

  return { availableMonuments, capturedMonuments };
};

module.exports = {
  getAllMonuments,
  getMonumentByName,
  getMonumentsForUser,
  createMonument,
  updateMonument,
  desactivateMonument,
  captureMonument
};