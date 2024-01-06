const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header("jwt_token");

    // Check if not token

        //console.log(token);
    if (!token) {
        return {message: "authorization denied", statusCode: 403, defaultExecute: true}
    }

    // Verify token
    try {

        const decoded = jwt.verify(token, process.env.jwtSecret);
        const { username, firstName, lastName } = decoded;

        req.user = username;
        req.firstName = firstName;
        req.lastName = lastName;
        next();
    } catch (err) {
        return {message: "Token is not valid", statusCode: 401, defaultExecute: true}
    }
};
