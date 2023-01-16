const { Schema, model } = require('mongoose')

const MedicoSchema = Schema({    
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId, // Para crear una relación con otro modelo
        ref: 'Usuario',
        required: true,
    },
    hospital: {
        type: Schema.Types.ObjectId, // Para crear una relación con otro modelo
        ref: 'Hospital',
        required: true,
    }
})

MedicoSchema.method('toJSON', function() {
    // No regresar el __v - No afecta a la BD
    const { __v, ...object } = this.toObject();
    return object
})

module.exports = model( 'Medico', MedicoSchema )