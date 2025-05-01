// config/swagger.config.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API d'Authentification JWT",
      version: "1.0.0",
      description: "Documentation de l'API d'authentification avec JWT",
      contact: {
        name: "Votre Nom",
        email: "votre@email.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./routes/*.js", "./controllers/*.js"] // fichiers à analyser pour la documentation
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  // Route pour la documentation Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  
  // Route pour le fichier JSON de la documentation
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};