const { response } = require("express");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../constants/env");

const validarJWT = (req, res = response, next) => {

    // Leer el token
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify( token, JWT_SECRET )

        req.uid = uid
        
        next()
        
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT,
}