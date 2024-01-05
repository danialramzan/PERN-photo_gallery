import jwt = require("jsonwebtoken");

require("dotenv").config();

function jwtGenerator(user_id: string, firstName: string, lastName: string) {
  const payload = {
    user: {
      id: user_id,
      firstName: firstName,
      lastName : lastName
    }
  };


  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
