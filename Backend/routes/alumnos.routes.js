// Importa Express para crear un router independiente.
const express = require("express")
    // Obtiene las funciones que ejecutan la lógica de cada endpoint.
const { obtenerAlumnos, obtenerAlumno, crearAlumno, actualizarAlumno, eliminarAlumno } = require("../controllers/alumnos.controller")
const router = express.Router()

// GET /alumnos: devuelve todos los alumnos.
router.get("/", obtenerAlumnos)

// GET /alumnos/:id: devuelve un alumno específico.
router.get("/:id", obtenerAlumno)

// POST /alumnos: registra un alumno enviado en req.body.
router.post("/", crearAlumno)

// PUT /alumnos/:id: actualiza el alumno indicado.
router.put("/:id", actualizarAlumno)

// DELETE /alumnos/:id: elimina el alumno indicado.
router.delete("/:id", eliminarAlumno)

// Hace disponible este router para server.js.
module.exports = router