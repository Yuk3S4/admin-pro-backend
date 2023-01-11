const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false,
    },

})

UsuarioSchema.method('toJSON', function() {
    // No regresar el __v, ni el password, y el _id cambiarlo por uid - No afecta a la BD
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id
    return object
})

module.exports = model( 'Usuario', UsuarioSchema )