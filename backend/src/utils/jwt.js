const jwt = require("jsonwebtoken");
const env = require("../config/env");

const signAccessToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

module.exports = {
  signAccessToken,
};
