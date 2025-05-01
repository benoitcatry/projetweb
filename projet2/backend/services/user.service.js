// services/user.service.js
const db = require('../models');
const User = db.User;

exports.getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email']
    });
    return user;
  } catch (error) {
    throw error;
  }
};