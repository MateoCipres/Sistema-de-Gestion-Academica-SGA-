// Arreglo en memoria que simula una base de datos de alumnos.
// Cada objeto contiene un identificador, el nombre y la carrera del alumno.
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

// Permite que otros módulos accedan y modifiquen este mismo arreglo.
module.exports = alumnos