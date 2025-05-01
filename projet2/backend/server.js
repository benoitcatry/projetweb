// server.js
const express = require("express");
const db = require("./models");
const setupSwagger = require("./config/swagger.config");

const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080', // ou votre URL frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Configuration Swagger
setupSwagger(app);

// Routes
require("./routes/auth.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});