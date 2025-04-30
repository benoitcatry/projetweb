const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'postgres',
  process.env.DB_USER || 'benoit',
  process.env.DB_PASSWORD || 'mdp',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log
  }
);

// Test de connexion
sequelize.authenticate()
  .then(() => console.log('🟢 Connexion DB réussie'))
  .catch(err => console.error('🔴 Erreur DB:', err));

// Exportez directement l'instance (sans l'objet wrapper)
module.exports = sequelize;