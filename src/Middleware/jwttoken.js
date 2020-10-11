const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.headers["authorization"];
        console.log(`This is Middleware ${token}`);
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
                if (err) {
                    return res.status(404).json({
                        success: false,
                        message: "Token is not invalid",
                    });
                } else {
                    req.decode = decode;
                    next();
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Auth Token is not supplied",
            });
        }
    },
};