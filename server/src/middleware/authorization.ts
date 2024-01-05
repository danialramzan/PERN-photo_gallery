const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req, res, next) {
    // Get token from header
    console.log(req.header);
    const token = req.header("jwt_token");

    // Check if not token
    console.log(token);
    if (!token) {
        // return res.status(403).json({ msg: "authorization denied" });
        return res.status(403).json(false);
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
        res.status(401).json(false);
        // res.status(401).json({ msg: "Token is not valid" });
    }
};
