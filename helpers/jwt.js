const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants/env')

const generarJWT = (uid) => {

    return new Promise( (resolve, reject) => {

        const payload = {
            uid,
        }
    
        jwt.sign( payload, JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
            
            if (err) {
                console.log(err)
                reject('No se pudo generar el JWT')
            } else {
                resolve( token )
            }    
        })
    
    })  
}

module.exports = {
    generarJWT,
}