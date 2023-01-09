require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');
const { PORT } = require('./constants/env');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use( cors() )

// Base de datos
dbConnection();

// Rutas
app.get( '/', ( req, res ) => {

    res.json({
        ok: 'true',
        msg: 'Hola Mundo'
    })

})

app.listen( PORT, () => {
    console.log('servidor corriendo en puerto ' + PORT);
})