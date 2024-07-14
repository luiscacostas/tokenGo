const routeService = require('../services/routes.services');


const getAllRoutes = async (req, res) => {
  try {
    const routes = await routeService.getAllRoutes();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoutesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const routes = await routeService.getRoutesByUser(userId);
    if (!routes) {
      return res.status(404).json({ message: 'Rutas no encontradas' });
    }
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRoute = async (req, res) => {
  try {
    const routeData = req.body;
    const route = await routeService.createRoute(routeData);
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllRoutes,
  getRoutesByUser,
  createRoute
};
