const { response } = require("express")
const Medico = require("../models/medico")
const Hospital = require("../models/hospital")

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'name img') // devolver el nombre e imágen del usuario relacionado
                                .populate('hospital', 'name') // devolver el nombre del hopital relacionado

    res.json({
        ok: true,
        medicos,
    })
    
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {        
        const medicoDB = await medico.save()
        
        res.json({
            ok: true,
            medico: medicoDB,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con al administrador'
        })
    }
}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico',
    })
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico',
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}