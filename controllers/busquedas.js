const { response } = require("express")
const Hospital = require("../models/hospital")
const Medico = require("../models/medico")
const Usuario = require('../models/usuario')

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda
    const regex = new RegExp( busqueda, 'i' )

    const [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({ name: regex }),
        Hospital.find({ name: regex }),
        Medico.find({ name: regex }),
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos,
    })
}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla
    const busqueda = req.params.busqueda
    const regex = new RegExp( busqueda, 'i' )

    let data = []
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ name: regex })
                               .populate('usuario', 'name img')
                               .populate('hospital', 'name img')
            break;
        case 'hospitales':
            data = await Hospital.find({ name: regex })
                                 .populate('usuario', 'name img')
            break;
        case 'usuarios':
            data = await Usuario.find({ name: regex })            
            break;    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })        
    }

    res.json({
        ok: true,
        resultados: data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion,
}