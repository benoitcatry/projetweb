// controllers/auth.controller.js
const authService = require('../services/auth.service');

exports.signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.send({ message: "User registered successfully!", user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const result = await authService.signin(req.body.username, req.body.password);
    res.send(result);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};