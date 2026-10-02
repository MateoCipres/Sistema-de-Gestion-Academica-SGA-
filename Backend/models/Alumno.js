// Mongoose proporciona el esquema, el modelo y la comunicación con la colección MongoDB.
const mongoose = require("mongoose")

// Define los campos que puede almacenar cada alumno y exige que el legajo sea único.
const alumnoSchema = new mongoose.Schema({
    legajo: {
        type: Number,
        unique: true
    },
    nombre: String,
    carrera: String,
    correo: String
}, {
    // Desactiva __v, el campo que Mongoose agrega para controlar versiones de documentos.
    versionKey: false
})

// El modelo ofrece métodos como find, create y findOneAndDelete al controlador.
const Alumno = mongoose.model("Alumno", alumnoSchema)

// Permite importar este modelo desde los controladores del backend.
module.exports = Alumno