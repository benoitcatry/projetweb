// config/auth.config.js
module.exports = {
    secret: "votre_cle_secrete_jwt",
    jwtExpiration: 3600,          // 1 heure
    jwtRefreshExpiration: 86400    // 24 heures
  };