const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY);
};

// register a new user
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    // check if email already exists
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }
    // check if email is new , allowing user to log in
    user = await User.create(req.body);
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

// login a user
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Wrong email or user doesn't exist" });
    }
    const password = user.checkPassword(req.body.password);
    if (!password) {
      return res
        .status(400)
        .send({ message: "Wrong password or user doesn't exist" });
    }
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { register, login };
