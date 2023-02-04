const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async(req, res = response) => {

    try {
        // Verificar que el token sea válidado por google
        const { email, name, picture } = await googleVerify( req.body.token )

        // Verificar si existe un usuario con ese email
        const usuarioDB = await Usuario.findOne({ email })
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true,
            })
        } else {
            usuario = usuarioDB
            usuario.google = true
        }

        // Guardar el usuario
        await usuario.save()

        // Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            email,
            name,
            picture,
            token,
        })
    } catch (err) {
        console.log(err)

        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto',
        })
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid

    // Generar el JWT
    const token = await generarJWT(uid)

    // Obtener el usuario por ID
    const usuario = await Usuario.findById(uid)

    res.json({
        ok: true,
        token,
        usuario,
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken,
}