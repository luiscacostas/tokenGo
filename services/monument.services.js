const Monument = require('../models/monument.models');

/**
 * @exports services
 * @autor Luis Acosta
 * @namespace MonumentService
 */

/**
 * Descripción: Obtiene todos los monumentos
 * @memberof MonumentService 
 * @method getAllMonuments 
 * @async 
 * @return {Array} - Lista de todos los monumentos
 * @throws {Error} Error al obtener los monumentos
 */
const getAllMonuments = async () => {
  try {
    const allMonuments = await Monument.find();
    console.log(allMonuments)
    return allMonuments;
  } catch (error) {
    console.error('Error al obtener los monumentos:', error);
    throw new Error('Error al obtener los monumentos');
  }
};

/**
 * Descripción: Obtiene un monumento por su nombre
 * @memberof MonumentService 
 * @method getMonumentByName 
 * @async 
 * @param {string} monumentName - El nombre del monumento a buscar
 * @return {Object} - El objeto del monumento encontrado
 * @throws {Error} Error al obtener el monumento
 */
const getMonumentByName = async (monumentName) => {
  try {
    const monument = await Monument.find({ name: monumentName });
    console.log(monument)
    if (!monument) {
      throw new Error('Monumento no encontrado');
    }
    return monument;
  } catch (error) {
    console.error('Error al obtener el monumento:', error);
    throw new Error('Error al obtener el monumento');
  }
};

/**
 * Descripción: Crea un nuevo monumento
 * @memberof MonumentService 
 * @method createMonument 
 * @async 
 * @param {Object} monumentData - Datos del nuevo monumento
 * @return {Object} - El objeto del monumento creado
 * @throws {Error} Error al crear el monumento
 */
const createMonument = async (monumentData) => {
  try {
    const monument = new Monument(monumentData);
    return await monument.save();
  } catch (error) {
    console.error('Error al crear el monumento:', error);
    throw new Error('Error al crear el monumento');
  }
};

/**
 * Descripción: Actualiza un monumento
 * @memberof MonumentService 
 * @method updateMonument 
 * @async 
 * @param {string} monumentId - ID del monumento
 * @param {Object} updateData - Datos a actualizar
 * @return {Object} - El objeto del monumento actualizado
 * @throws {Error} Error al actualizar el monumento
 */
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

/**
 * Descripción: Desactiva un monumento en lugar de eliminarlo físicamente
 * @memberof MonumentService 
 * @method desactivateMonument 
 * @async 
 * @param {string} monumentId - ID del monumento a desactivar
 * @return {Object} - El objeto del monumento desactivado
 * @throws {Error} Error al desactivar el monumento
 */
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

module.exports = {
  getAllMonuments,
  getMonumentByName,
  createMonument,
  updateMonument,
  desactivateMonument
};

// const newMonument = {
//     name: 'Camp Nou Dead',
//     city: 'Barcelonita',
//     isActive:true,
//     icon: 'https://example.com/icons/eiffel_tower.png'
//   };
//createMonument(newMonument)
//getAllMonuments()
//getMonumentByName('Santiago Bernabeu')
//desactivateMonument('6692bb39235fdae05d119afe')
//updateMonument('6692bb39235fdae05d119afe',newMonument)