/*
    Hospitales
    Ruta : /api/v1/medicos
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoByID } = require('../controllers/medicos')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get( '/', validarJWT, getMedicos )

router.get('/:id', getMedicoByID)

router.post( '/', 
    [
        validarJWT,
        check('name', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser válido').isMongoId(),
        validarCampos,
    ], 
    crearMedico
)

router.put( '/:id', 
    [
        validarJWT,
        check('name', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser válido').isMongoId(),
        validarCampos,
    ], 
    actualizarMedico
)

router.delete('/:id',
    validarJWT,
    borrarMedico
)


module.exports = router