const Monument = require('../models/monument.models');
const User = require('../models/user.models');

const getAllMonuments = async () => {
  try {
    const allMonuments = await Monument.find();
    return allMonuments;
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
        coordinates: [latitude, longitude]
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

module.exports = {
  getAllMonuments,
  getMonumentByName,
  createMonument,
  updateMonument,
  desactivateMonument,
  captureMonument
};

// const saveMonument = async () => {
//   try {
//     const monument = new Monument(newMonument);
//     const savedMonument = await monument.save();
//     console.log('Monument saved:', savedMonument);
//   } catch (error) {
//     console.error('Error saving monument:', error.message);
//   } finally {
//     mongoose.connection.close();
//   }
// };
// saveMonument();


// const newMonumentData = {
//   name: "100 Montaditos",
//   city: "Madrid",
//   location: {
//           type: 'Point',
//           coordinates: [48.415363, -7.807398]
//         },
//   icon: "https://example.com/icons/plaza_mayor.png"
// }