const Route = require('../models/routes.models');

/**
 * @exports services
 * @autor Luis Acosta
 * @namespace RouteService
 */

/**
 * Descripción: Obtiene todas las rutas
 * @memberof RouteService 
 * @method getAllRoutes 
 * @async 
 * @return {Array} - Lista de todas las rutas
 * @throws {Error} Error al obtener las rutas
 */
const getAllRoutes = async () => {
  try {
    const allRoutes = await Route.find();
    console.log(allRoutes)
    return allRoutes;
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
    throw new Error('Error al obtener las rutas');
  }
};

/**
 * Descripción: Obtiene rutas por usuario
 * @memberof RouteService 
 * @method getRoutesByUser 
 * @async 
 * @param {string} userId - El ID del usuario
 * @return {Array} - Lista de rutas del usuario
 * @throws {Error} Error al obtener las rutas del usuario
 */
const getRoutesByUser = async (userId) => {
  try {
    const route = await Route.find({ user_id: userId });
    console.log(route)
    return route;
  } catch (error) {
    console.error('Error al obtener las rutas del usuario:', error);
    throw new Error('Error al obtener las rutas del usuario');
  }
};

/**
 * Descripción: Crea una nueva ruta
 * @memberof RouteService 
 * @method createRoute 
 * @async 
 * @param {Object} routeData - Datos de la nueva ruta
 * @return {Object} - El objeto de la ruta creada
 * @throws {Error} Error al crear la ruta
 */
const createRoute = async (routeData) => {
  try {
    const route = new Route(routeData);
    return await route.save();
  } catch (error) {
    console.error('Error al crear la ruta:', error);
    throw new Error('Error al crear la ruta');
  }
};


module.exports = {
  getAllRoutes,
  getRoutesByUser,
  createRoute,
};

// const newRoute = {
//     user_id: '6692ac39858e6724d5c5acef',
//     city: 'Paris',
//     route: [
//       {
//         timestamp: new Date('2024-07-13T12:34:56.789Z'),
//         location: {
//           type: 'Point',
//           coordinates: [2.2945, 48.8584]
//         }
//       },
//       {
//         timestamp: new Date('2024-07-13T12:45:56.789Z'),
//         location: {
//           type: 'Point',
//           coordinates: [2.2950, 48.8590]
//         }
//       }
//     ]
//   };

//createRoute(newRoute)
//getAllRoutes()
//getRoutesByUser('6692abf8ea8dbfbeb5b649c5')