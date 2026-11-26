const mongoose = require("mongoose")

const cursoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        unique: true
    },
    nombre: String,
    descripcion: String,
    duracion: Number
},
{
    versionKey: false
}
)

const Curso = mongoose.model("Curso", cursoSchema)

module.exports = Curso
