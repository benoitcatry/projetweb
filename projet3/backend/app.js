require('dotenv').config();
const express = require('express');
const app = express();
const http = require("http").createServer(app);
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const connectDB = require('./libs/db-connection');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const Message = require('./models/Chat');
const User = require('./models/User');

// Configuration cruciale pour Socket.io
const sharedSession = require('express-socket.io-session');

// 1. Configuration CORS pour Express
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  exposedHeaders: ['set-cookie'] // Important pour les cookies
}));

// 2. Connexion à la base de données
connectDB();

// 3. Configuration de la session
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 // 1 jour en secondes
  }),
  cookie: {
    httpOnly: true,
    secure: false, // true en production avec HTTPS
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/' // Important pour Socket.io
  }
});

app.use(sessionMiddleware);

// 4. Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());
require('./libs/passport');

// 5. Routes
app.use('/auth', authRoutes);

// 6. Configuration Socket.io
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
    credentials: true
  },
  transports: ['websocket'], // Force WebSocket seulement
  cookie: true // Active le partage de cookies
});

// 7. Partage de session entre Express et Socket.io
io.use(sharedSession(sessionMiddleware, {
  autoSave: true
}));

// 8. Middleware d'authentification Socket.io
io.use(async (socket, next) => {
  try {
    console.log('Cookies reçus:', socket.handshake.headers.cookie);
    
    if (!socket.handshake.session) {
      throw new Error('Session non trouvée');
    }

    const userId = socket.handshake.session.passport?.user;
    if (!userId) {
      throw new Error('ID utilisateur non trouvé dans la session');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Utilisateur introuvable en base');
    }

    socket.user = user;
    console.log(`Authentification réussie pour ${user.displayName}`);
    next();
  } catch (err) {
    console.error('Erreur auth Socket.io:', err.message);
    next(new Error('Authentification échouée: ' + err.message));
  }
});

// Gestion des connexions
io.on('connection', (socket) => {
  console.log(`Nouvelle connexion: ${socket.user.displayName}`);

  // Réception des nouveaux messages
  socket.on('send_message', async (content) => {
    try {
      const message = new Message({
        user: socket.user._id,
        content
      });
      
      await message.save();
      
      // Récupération complète avec les données utilisateur
      const fullMessage = await Message.populate(message, {
        path: 'user',
        select: 'displayName avatar'
      });
      
      // Émission à TOUS les clients connectés
      io.emit('new_message', fullMessage); // <-- Changement clé ici
      
      console.log('Message diffusé:', fullMessage);
    } catch (err) {
      console.error('Erreur:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Déconnexion: ${socket.user.displayName}`);
  });
});


app.get('/api/messages', async (req, res) => {
  try {
    console.log("Tentative de récupération des messages...");
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .populate('user', 'displayName avatar');
    
    console.log(`Messages trouvés : ${messages.length}`);
    console.log("Exemple de message :", messages[0]);
    
    res.json(messages.reverse());
  } catch (err) {
    console.error("Erreur lors de la récupération :", err);
    res.status(500).json({ error: err.message });
  }
});

// 10. Démarrage du serveur
http.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});