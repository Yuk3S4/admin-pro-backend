const { Schema, model } = require('mongoose')

const HospitalSchema = Schema({    
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId, // Para crear una relación con otro modelo
        ref: 'Usuario'
    }
    
    // Cambiar el nombre de la tabla de hospitals a hospitales
}, { collection: 'hospitales' })

HospitalSchema.method('toJSON', function() {
    // No regresar el __v - No afecta a la BD
    const { __v, ...object } = this.toObject();
    return object
})

module.exports = model( 'Hospital', HospitalSchema )