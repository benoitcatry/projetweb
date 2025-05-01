const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route pour démarrer l'authentification Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirigez vers l'URL du frontend avec le token ou l'état
    res.redirect('http://localhost:8080/auth-success');
  }
);

// Route pour obtenir les infos de l'utilisateur connecté
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  res.json(req.user);
});

// Déconnexion
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
    res.redirect('/');
  });
});
// routes/auth.js - Ajoutez cette route
router.get('/user-data', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Non authentifié' });
  }
  res.json(req.user);
});

module.exports = router;