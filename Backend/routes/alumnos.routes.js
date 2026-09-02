// Express permite crear un enrutador independiente para las operaciones de alumnos.
const express = require("express")
const { obtenerAlumnos, obtenerAlumno } = require("../controllers/alumnos.controller")
const router = express.Router()

// GET /alumnos: obtiene la lista completa de alumnos.
router.get("/", obtenerAlumnos)

// GET /alumnos/:id: obtiene un alumno utilizando el ID enviado en la URL.
router.get("/:id", obtenerAlumno)

// POST /alumnos: toma el alumno recibido en el cuerpo y lo agrega al arreglo.
router.post("/", (req, res) => {
    const nuevoAlumno = req.body
    alumnos.push(nuevoAlumno)
    res.json({ mensaje: "Alumno registrado correctamente" })
})

// PUT /alumnos/:id: localiza un alumno y reemplaza sus datos con los recibidos.
router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const alumno = alumnos.find(alumno => alumno.id === id)
    alumno.id = req.body.id
    alumno.nombre = req.body.nombre
    alumno.carrera = req.body.carrera
    res.json({ mensaje: "Alumno actualizado correctamente" })
})

// DELETE /alumnos/:id: elimina del arreglo el alumno cuyo ID coincide.
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    alumnos = alumnos.filter(alumno => alumno.id !== id)
    res.json({ mensaje: "Alumno eliminado correctamente" })
})

// Exporta el enrutador para conectarlo en server.js.
module.exports = router