// Importa el arreglo que funciona como almacenamiento temporal de alumnos.
const alumnos = require("../data/alumnos")

// Devuelve la colección completa en formato JSON.
function obtenerAlumnos(req, res) {
    res.json(alumnos)
}

// Busca un alumno por el ID recibido en la URL y devuelve 404 si no existe.
function obtenerAlumno(req, res) {
    // Los parámetros de Express llegan como texto, por eso se convierten a número.
    const id = Number(req.params.id)
    const alumno = alumnos.find(a => a.id === id)
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        })
    }
    res.json(alumno)

}

// Valida los campos básicos del cuerpo y agrega un nuevo alumno al arreglo.
function crearAlumno(req, res) {
    // req.body contiene el objeto enviado por el cliente mediante JSON.
    const nuevoAlumno = req.body
    const { id, nombre, carrera } = req.body
    if (!id || !nombre || !carrera) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        })
    }
    if (typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El nombre debe ser un texto"
        })
    }

    // push incorpora el registro al almacenamiento en memoria.
    alumnos.push(nuevoAlumno)
    res.status(201).json({ mensaje: "Alumno registrado correctamente" })
}

// Actualiza los datos del alumno que coincide con el ID de la URL.
function actualizarAlumno(req, res) {
    const id = Number(req.params.id)
    const alumno = alumnos.find(alumno => alumno.id === id)
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        })
    }
    // Reemplaza las propiedades con los valores recibidos en la solicitud.
    alumno.id = req.body.id
    alumno.nombre = req.body.nombre
    alumno.carrera = req.body.carrera

    res.json({ mensaje: "Alumno actualizado correctamente" })
}

// Elimina del arreglo el alumno indicado por el parámetro de la URL.
function eliminarAlumno(req, res) {
    const id = Number(req.params.id)
        // filter crea una nueva lista conservando todos los alumnos con otro ID.
    const alumnosActualizados = alumnos.filter(alumno => alumno.id !== id)
    const alumno = alumnos.find(a => a.id != id)
    if (!alumnosActualizados) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        })
    }
    // Vacía el arreglo original y copia la lista filtrada para conservar su referencia.
    alumnos.length = 0
    alumnos.push(...alumnosActualizados)

    res.json({ mensaje: "Alumno eliminado correctamente" })
}

// Exporta los controladores para que el archivo de rutas pueda asociarlos a endpoints.
module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}