console.log("🟢 Démarrage de l'application");

process.on('uncaughtException', (err) => {
  console.error('🔴 ERREUR NON CAPTURÉE:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔴 REJET NON GÉRÉ:', reason);
});

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/database');
const passport = require('passport');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:8082',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: 'sessions',
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'lax', // Important pour le développement local
    secure: process.env.NODE_ENV === 'production'
  }
}));
app.use((req, res, next) => {
  console.log('Cookies:', req.cookies); // Debug
  console.log('Session ID:', req.sessionID); // Debug
  next();
});

// Passport
require('./config/passport-config')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Synchronisation et démarrage
sessionStore.sync().then(() => {
  sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  });
});