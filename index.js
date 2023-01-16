require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');
const { PORT } = require('./constants/env');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use( cors() )

// Lectura y parseo del body
app.use( express.json() )

// Base de datos
dbConnection();

// Rutas
app.use( '/api/v1/usuarios', require('./routes/usuarios') )
app.use( '/api/v1/medicos', require('./routes/medicos') )
app.use( '/api/v1/hospitales', require('./routes/hospitales') )
app.use( '/api/v1/login', require('./routes/auth') )
app.use( '/api/v1/todo', require('./routes/busquedas') )
app.use( '/api/v1/upload', require('./routes/uploads') )

app.listen( PORT, () => {
    console.log('servidor corriendo en puerto ' + PORT);
})