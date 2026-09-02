// Importa el arreglo que funciona como fuente de datos temporal de alumnos.
const alumnos = require("../data/alumnos")

// Devuelve todos los alumnos en formato JSON como respuesta de la API.
function obtenerAlumnos(req, res) {
    res.json(alumnos)
}

// Convierte el parámetro de la URL a número, busca el alumno y lo devuelve.
function obtenerAlumno(req, res) {
    const id = Number(req.params.id)
    const alumno = alumnos.find(a => a.id === id)
    res.json(alumno)

}

// Exporta las funciones para que puedan ser utilizadas por el archivo de rutas.
module.exports = { obtenerAlumnos, obtenerAlumno }