const mongoose = require('mongoose');
const { DB_CNN } = require('../constants/env');

const dbConnection = async () => {

    // try {
    //     await mongoose.connect(DB_CNN) 

    //     console.log('DB Online')
    // } catch (error) {
    //     console.log(error);
    //     throw new Error('Error a la hora de iniciar la BD ver logs')
    // }

    mongoose.connection.openUri(DB_CNN, { 
        useUnifiedTopology: true,
        useNewUrlParser: true 
    })
    .then(() => {
        console.log('DB Online');
    })
    .catch((err) => {
        console.error(err);
    });

}

module.exports = {
    dbConnection
}