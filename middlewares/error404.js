/**
 * @author Luis Carlos
 * @exports middleware
 * @namespace Error404MiddlewareFunctions 
 */

/**
 * Descripción: Responde con un estado HTTP 404 y un mensaje JSON indicando que no se encontró el recurso.
 * @memberof Error404MiddlewareFunctions 
 * @method manage404
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @param {Function} next - Función de middleware para pasar al siguiente middleware.
 */
const manage404 = (req,res, next) => {
    res.status(404).json({
        msj:"404 not found",
        img: "../public/assets/image-not-found-author-bamdewanto.jpg"
    });
}

module.exports = manage404;