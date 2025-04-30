const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    
    const newUser = await User.create({ email, password });
    
    req.login(newUser, (err) => {
      if (err) {
        console.error('Login after register error:', err);
        return res.status(500).json({ message: 'Erreur de connexion après inscription' });
      }
      return res.status(201).json({ 
        message: 'Inscription réussie', 
        user: { id: newUser.id, email: newUser.email } 
      });
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      message: 'Erreur lors de l\'inscription',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: 'Connexion réussie', user });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  // Détruire complètement la session
  req.session.destroy(err => {
    if (err) {
      console.error('Session destruction error:', err);
      return res.status(500).json({ success: false });
    }
    
    // Effacer le cookie de session
    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: false, // Même valeur que dans la config session
      sameSite: 'lax'
    });
    
    return res.json({ success: true });
  });
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Non authentifié' });
  }
});

router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ authenticated: true, user: req.user });
  }
  res.json({ authenticated: false });
});


module.exports = router;