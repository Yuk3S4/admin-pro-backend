const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')
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

const validarADMIN_ROLE = async(req, res = response, next) => {

    const uid = req.uid

    try {
        
        const userDB = await Usuario.findById(uid)

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if ( userDB.role !== 'ADMIN_ROLE' ) {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            })
        }
        
        next();

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        })
    }

}

const validarADMIN_ROLE_o_MismoUsuario = async(req, res = response, next) => {

    const uid = req.uid
    const id = req.params.id

    try {
        
        const userDB = await Usuario.findById(uid)

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if ( userDB.role === 'ADMIN_ROLE' || uid === id ) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            })
        }       
        

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        })
    }

}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario,
}