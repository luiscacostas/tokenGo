const mongoose = require('mongoose');
const Monument = require('../models/monument.models');
const User = require('../models/user.models');

const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID');
  }
};

const findUserById = async (userId) => {
  validateObjectId(userId);
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const findMonumentById = async (monumentId) => {
  validateObjectId(monumentId);
  const monument = await Monument.findById(monumentId);
  if (!monument) {
    throw new Error('Monument not found');
  }
  return monument;
};

const getAllMonuments = async () => {
  try {
    const monuments = await Monument.find();
    return monuments;
  } catch (error) {
    console.error('Error fetching monuments:', error);
    throw new Error('Internal server error');
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

const deactivateMonument = async (monumentId) => {
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

const captureMonument = async(userId, monumentId) => {
  const monument = await Monument.findById(monumentId);
  if (!monument) {
    throw new Error('Monument not found');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.tokens.some(token => token.monument_id.toString() === monumentId)) {
    throw new Error('Monument already captured by this user');
  }

  user.tokens.push({
    monument_id: monumentId,
    collected_at: new Date()
  });

  let cityProgress = user.progress.find(p => p.city === monument.city);
  if (!cityProgress) {
    cityProgress = {
      city: monument.city,
      tokens_collected: 0,
      total_tokens: await Monument.countDocuments({ city: monument.city })
    };
    user.progress.push(cityProgress);
  }
  cityProgress.tokens_collected += 1;

  await user.save();

  return monument;
};

const getMonumentsForUser = async (userId) => {
  try {
    const user = await findUserById(userId).populate('tokens.monument_id');
    const capturedMonumentIds = user.tokens.map(token => token.monument_id._id);
    
    const [availableMonuments, capturedMonuments] = await Promise.all([
      Monument.find({ _id: { $nin: capturedMonumentIds } }),
      Monument.find({ _id: { $in: capturedMonumentIds } })
    ]);

    return { availableMonuments, capturedMonuments };
  } catch (error) {
    console.error('Error al obtener los monumentos para el usuario:', error);
    throw new Error('Error al obtener los monumentos para el usuario');
  }
};

const getAvailableMonuments = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const capturedMonumentIds = user.tokens.map(token => token.monument_id);
  return await Monument.find({ 
    _id: { $nin: capturedMonumentIds },
    isActive: true 
  });
};

const getCapturedMonuments = async (userId) => {
  const user = await User.findById(userId).populate('tokens.monument_id');
  return user.tokens.map(token => token.monument_id);
};

module.exports = {
  getAllMonuments,
  getMonumentByName,
  getAvailableMonuments,
  getCapturedMonuments,
  getMonumentsForUser,
  createMonument,
  updateMonument,
  deactivateMonument,
  captureMonument
};