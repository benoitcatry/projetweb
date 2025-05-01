// routes/auth.routes.js
const { verifyToken } = require("../middlewares/authJwt");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification des utilisateurs
 */

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     summary: Inscription d'un nouvel utilisateur
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - email
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       200:
   *         description: Utilisateur enregistré avec succès
   *       500:
   *         description: Erreur serveur
   */
  app.post("/api/auth/signup", authController.signup);

  /**
   * @swagger
   * /api/auth/signin:
   *   post:
   *     summary: Connexion d'un utilisateur
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       200:
   *         description: Token JWT généré avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 username:
   *                   type: string
   *                 email:
   *                   type: string
   *                 accessToken:
   *                   type: string
   *       401:
   *         description: Identifiants invalides
   */
  app.post("/api/auth/signin", authController.signin);

  /**
   * @swagger
   * /api/test/user:
   *   get:
   *     summary: Récupère le profil utilisateur (protégé)
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Profil utilisateur
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       401:
   *         description: Non autorisé
   *       404:
   *         description: Utilisateur non trouvé
   */
  app.get("/api/test/user", [verifyToken], userController.getUserProfile);
};