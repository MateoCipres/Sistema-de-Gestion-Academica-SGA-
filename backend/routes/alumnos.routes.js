// Importa Express para construir el router y las funciones que resuelven cada operación CRUD.
const express = require("express")
    // const alumnosController = require("../controllers/alumnos.controller")
const {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
} = require("../controllers/alumnos.controller")
const router = express.Router()

// Cada método y ruta HTTP se delega al controlador correspondiente.
router.get("/", obtenerAlumnos)

router.get("/:id", obtenerAlumno)

router.post("/", crearAlumno)

router.put("/:id", actualizarAlumno)

router.delete("/:id", eliminarAlumno)

module.exports = router