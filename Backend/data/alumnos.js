// Datos iniciales en memoria; se pierden cuando se detiene el servidor.
const alumnos = [{
        id: 1,
        nombre: "Ana",
        carrera: "Programación"
    },
    {
        id: 2,
        nombre: "José",
        carrera: "Sistemas"
    }
]

// Exporta el mismo arreglo para que el controlador pueda consultarlo y modificarlo.
module.exports = alumnos