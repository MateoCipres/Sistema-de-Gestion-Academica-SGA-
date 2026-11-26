const express = require("express") 
// const alumnosController = require(
const { verificarToken } = require("../middlewares/authMiddleware") // Importar el middleware de verificación de token
const { verificarRol } = require("../middlewares/rolMiddleware")

const { 
    obtenerCursos, 
    obtenerCurso, 
    crearCurso, 
    actualizarCurso, 
    eliminarCurso } = require("../controllers/cursos.controllers")
const router = express.Router() 

router.get("/", verificarToken, obtenerCursos) 

router.get("/:codigo", verificarToken, obtenerCurso) 

router.post("/", verificarToken, verificarRol("admin"), crearCurso) 

router.put("/:codigo", verificarToken, verificarRol("admin"), actualizarCurso) 

router.delete("/:codigo",verificarToken, verificarRol("admin"), eliminarCurso) 

module.exports = router 