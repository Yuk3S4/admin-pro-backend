const { response } = require("express")
const Medico = require("../models/medico")
const Hospital = require("../models/hospital")
const { isMongoId } = require("class-validator")

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

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id
    const uid = req.uid

    try {

        // Buscamos un medico por el ID
        const medicoDB = await Medico.findById(id)
        if ( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no econtrado por id',
            })
        }

        const medico = {
            ...req.body,
            usuario: uid,
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, medico, {new: true})      

        res.json({
            ok: true,
            medico: medicoActualizado,
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con al administrador',
        })
    }
    
}

const borrarMedico = async(req, res = response) => {
    const id = req.params.id

    try {

        // Buscamos un medico por el ID
        const medicoDB = await Medico.findById(id)
        if ( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no econtrado por id',
            })
        }

        await Medico.findByIdAndDelete(id)     

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con al administrador',
        })
    }
}

const getMedicoByID = async(req, res = response) => {

    const id = req.params.id

    try {

        if (!isMongoId(id)) {
            return res.status(400).json({
                ok: false,
                msg: 'ID no válido',
            })
        }

        const medico = await Medico.findById(id)
                                .populate('usuario', 'name img') // devolver el nombre e imágen del usuario relacionado
                                .populate('hospital', 'name') // devolver el nombre del hopital relacionado
        
        // if (!medico) {
        //     return res.status(404).json({
        //         ok: false,
        //         msg: 'Médico no encontrado por id',
        //     })
        // }

        res.json({
            ok: true,
            medico,
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con al administrador',
        })
    }
    
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoByID,
}