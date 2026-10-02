// El controlador traduce solicitudes HTTP en consultas al modelo MongoDB y respuestas JSON.
const Alumno = require("../models/Alumno")

// GET /alumnos: consulta todos los documentos de la colección.
async function obtenerAlumnos(req, res) {
    const alumnos = await Alumno.find()
    res.json(alumnos)
}

// GET /alumnos/:id: convierte el parámetro de URL a número y busca por legajo.
async function obtenerAlumno(req, res) {
    const alumno = await Alumno.findOne({
        legajo: Number(req.params.id)
    })
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        })
    }
    res.json(alumno)
}

// POST /alumnos: valida los datos recibidos, evita legajos duplicados y crea el documento.
async function crearAlumno(req, res) {
    const { legajo, nombre, carrera, correo } = req.body
    if (!legajo || !nombre || !carrera || !correo) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        })
    }
    if (typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El nombre debe ser un texto"
        })
    }
    if (typeof legajo !== "number") {
        return res.status(400).json({
            mensaje: "El legajo debe ser un número"
        })
    }
    // Comprueba que el legajo aún no pertenezca a otro documento antes de crear el nuevo.
    const existe = await Alumno.findOne({
        legajo
    })
    if (existe) {
        return res.status(400).json({
            mensaje: "El legajo ya existe"
        })
    }
    const nuevoAlumno = await Alumno.create({
        legajo,
        nombre,
        carrera,
        correo
    })
    res.status(201).json(nuevoAlumno)
}

// PUT /alumnos/:id: actualiza los campos editables y devuelve el documento resultante.
async function actualizarAlumno(req, res) {
    const { nombre, carrera, correo } = req.body
    const alumno = await Alumno.findOneAndUpdate({ legajo: Number(req.params.id) }, { nombre, carrera, correo }, { returnDocument: "after" })
        // Una búsqueda sin coincidencias se informa como 404 en vez de devolver un alumno inexistente.
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no econtrado"
        })
    }

    res.json(alumno)
}

// DELETE /alumnos/:id: elimina el documento por legajo y responde si no existía.
async function eliminarAlumno(req, res) {
    const alumno = await Alumno.findOneAndDelete({ legajo: Number(req.params.id) })
    if (!alumno) {
        return res.status(404).json({
            mensaje: "Alumno no econtrado"
        })
    }

    res.json({ mensaje: "Alumno eliminado correctamente" })
}

// Exporta los controladores para que el router pueda asociarlos a sus endpoints.
module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}