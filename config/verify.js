const jwt = require("jsonwebtoken")
const config = require("../config/jwt")
const { secret } = require('../config/jwt')

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, secret);
        
        return next()
        
    } catch {
        return res.sendStatus(403);
    }
}

module.exports = authorization