const path = require('path') // para construir un path completo
const fs = require('fs')

const { response } = require("express")
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo
    const id = req.params.id

    // Validar el tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios']
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        })
    }

    // Validar que exista un archivo en la request
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        })
    }

    // Procesar la imagen...
    const file = req.files.imagen

    const nombreCortado = file.name.split('.') 
    const extensionFile = nombreCortado[ nombreCortado.length - 1 ]

    // Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'PNG', 'JPG', 'JPEG', 'GIF']
    if ( !extensionesValidas.includes(extensionFile) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión de archivo permitida'
        })
    }

    // Generar el nombre del archivo
    const nombreFile = `${ uuidv4() }.${ extensionFile }`

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreFile }`

    // Mover la imágen
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ 
                ok: false,
                msg: 'Error al mover la imágen'
            })
        }

        // Actualizar la DB
        actualizarImagen(tipo, id, nombreFile)

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreFile,
        })
    })
}

const getImagen = (req, res = response) => {
    const tipo = req.params.tipo
    const foto = req.params.foto

    let pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` )

    // imagen por defecto
    if ( fs.existsSync(pathImg) ) {
        res.sendFile( pathImg ) // Responder con la imagen        
    } else {
        pathImg = path.join( __dirname, `../uploads/no-img.jpg` )
        res.sendFile( pathImg ) 
    }

}

module.exports = {
    fileUpload,
    getImagen,
}