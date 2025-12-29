const { errorResponse } = require('../utils/responseHandler');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if (!token) {
        throw errorResponse(401, "Token não fornecido.")
    }
   
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) throw errorResponse(403, 'Token inválido ou expirado')

        req.user = decoded // contém sub, email
        next()
    })
}

module.exports = {authenticateToken}
