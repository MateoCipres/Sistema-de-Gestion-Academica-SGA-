const express = require("express") 
// const alumnosController = require(
const { verificarToken } = require("../middlewares/authMiddleware") // Importar el middleware de verificación de token
const { verificarRol } = require("../middlewares/rolMiddleware")

const { 
    obtenerAlumnos, 
    obtenerAlumno, 
    crearAlumno, 
    actualizarAlumno, 
    eliminarAlumno } = require("../controllers/alumnos.controller")
const router = express.Router() 

router.get("/", verificarToken, obtenerAlumnos) // Ruta para obtener todos los alumnos, protegida por el middleware de verificación de token

router.get("/:id", verificarToken, obtenerAlumno) 

router.post("/", verificarToken, verificarRol("admin"), crearAlumno) 

router.put("/:id", verificarToken, verificarRol("admin"), actualizarAlumno) 

router.delete("/:id",verificarToken, verificarRol("admin"), eliminarAlumno) 

module.exports = router 