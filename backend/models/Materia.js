const mongoose = require("mongoose")

const materiaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        unique: true
    },
    nombre: String,
    descripcion: String,
    cargaHoraria: Number,
    estado: String
},
{
    versionKey: false
}
)

const Materia = mongoose.model("Materia", materiaSchema)

module.exports = Materia
