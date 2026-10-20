// Mongoose conecta la aplicación Node.js con MongoDB y expone las operaciones del modelo.
const mongoose = require("mongoose")

// Abre la conexión antes de que los controladores consulten o modifiquen datos.
async function conectarBD() {
    try {
        // La URI apunta a MongoDB local y selecciona la base de datos llamada SGA.
        await mongoose.connect("mongodb://localhost:27017/SGA")
        console.log("Base de datos conectada")
    } catch (error) {
        // Informa el fallo de conexión para diagnosticarlo en la consola del servidor.
        console.log(error)
    }

}

// Exporta la función para que server.js pueda iniciar la conexión al arrancar.
module.exports = conectarBD