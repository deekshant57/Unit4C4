const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .send({ message: "Authorisation token not found or incorrect" });
  }
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res
      .status(400)
      .send({ message: "Authorisation token not found or incorrect" });
  }
  const token = req.headers.authorization.trim().split(" ")[1];
  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  req.userId = decoded.user._id;
  return next();
};

module.exports = authenticate;
