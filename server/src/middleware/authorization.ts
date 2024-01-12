const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req, next) {
    // Get token from header
    const token = req.header("jwt_token");

    // Check if not token

        //console.log(token);
    if (!token) {
        return {message: "authorization denied", statusCode: 403, defaultExecute: true}
    }

    // Verify token
    try {
        const {user: { id, firstName, lastName } } = jwt.verify(token, process.env.jwtSecret);
        req.username = id;
        req.firstName = firstName;
        req.lastName = lastName;
        next();
        return {message: "Valid Token!", statusCode: 401, defaultExecute: true}
    } catch (err) {
        return {message: "Token is not valid", statusCode: 401, defaultExecute: true}
    }
};
