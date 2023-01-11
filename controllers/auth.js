const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body

    try {

        // Verificar email
        const userDB = await Usuario.findOne({ email })
        if (!userDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Email o password incorrectos'
            })
        }

        // Verificar password
        const validPassword = bcrypt.compareSync( password, userDB.password )
        if (!validPassword) {
            return res.status(400).json({
                ok: true,
                msg: 'Email o password incorrectos'
            })
        }

        // Generar el JWT
        const token = await generarJWT(userDB.id)

        res.json({
            ok: true,
            token
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login,
}