// controllers/user.controller.js
const userService = require('../services/user.service');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'utilisateur
 *         username:
 *           type: string
 *           description: Nom d'utilisateur
 *         email:
 *           type: string
 *           format: email
 *           description: Email de l'utilisateur
 *       example:
 *         id: 1
 *         username: johndoe
 *         email: john@example.com
 */

// controllers/user.controller.js
exports.getUserProfile = async (req, res) => {
    // Vérifiez d'abord si le token est présent (normalement fait par le middleware)
    if (!req.headers['authorization']) {
      return res.status(403).json({ 
        message: "No token provided!",
        solution: "Please add Authorization header with Bearer token"
      });
    }
  
    try {
      const user = await userService.getUserById(req.userId);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };