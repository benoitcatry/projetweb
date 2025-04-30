const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Spécifie que le champ 'email' est utilisé comme identifiant
    async (email, password, done) => { // Les paramètres sont fournis par Passport
      try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
          return done(null, false, { message: 'Email non enregistré' });
        }
        
        // Compare le mot de passe fourni avec le hash en base
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Mot de passe incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};