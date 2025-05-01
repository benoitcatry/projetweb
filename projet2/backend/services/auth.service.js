// services/auth.service.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.User;

exports.signup = async (userData) => {
  try {
    const user = await User.create({
      username: userData.username,
      email: userData.email,
      password: bcrypt.hashSync(userData.password, 8)
    });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.signin = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      throw new Error("User Not found.");
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    
    if (!passwordIsValid) {
      throw new Error("Invalid Password!");
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    };
  } catch (error) {
    throw error;
  }
};