const Alumno = require("../models/Alumno")


async function obtenerAlumnos(req, res) {
    try {
        const alumnos = await Alumno.find()
        res.json(alumnos)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los alumnos" })
    }
}

// Busca un alumno por el ID recibido en la URL y devuelve 404 si no existe.
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

// Valida los campos básicos del cuerpo y guarda el alumno en MongoDB.
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
    const nuevoAlumno = await Alumno.create({

    })

    try {
        const alumno = await Alumno.create({
            legajo: id,
            nombre,
            carrera,
            correo: req.body.correo
        })
        res.status(201).json(alumno)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar el alumno" })
    }
}

// Actualiza los datos del alumno que coincide con el ID de la URL.
async function actualizarAlumno(req, res) {
    try {
        const alumno = await Alumno.findOneAndUpdate({ legajo: Number(req.params.id) }, {
            nombre: req.body.nombre,
            carrera: req.body.carrera,
            correo: req.body.correo
        }, { new: true, runValidators: true })
        if (!alumno) {
            return res.status(404).json({ mensaje: "Alumno no encontrado" })
        }
        res.json(alumno)
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el alumno" })
    }
}

// Elimina de MongoDB el alumno indicado por el parámetro de la URL.
async function eliminarAlumno(req, res) {
    try {
        const alumno = await Alumno.findOneAndDelete({ legajo: Number(req.params.id) })
        if (!alumno) {
            return res.status(404).json({ mensaje: "Alumno no encontrado" })
        }
        res.json({ mensaje: "Alumno eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el alumno" })
    }
}

// Exporta los controladores para que el archivo de rutas pueda asociarlos a endpoints.
module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}