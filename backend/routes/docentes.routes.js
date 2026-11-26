const express = require("express") 
// const alumnosController = require("../controllers/alumnos.controller")
const { verificarToken } = require("../middlewares/authMiddleware")
const { verificarRol } = require("../middlewares/rolMiddleware")
const { 
    obtenerDocentes, 
    obtenerDocente, 
    crearDocente, 
    actualizarDocente, 
    eliminarDocente } = require("../controllers/docentes.controller")
const router = express.Router() 

router.get("/", verificarToken, obtenerDocentes) 

router.get("/:id", verificarToken, obtenerDocente) 

router.post("/", verificarToken, verificarRol("admin"), crearDocente) 

router.put("/:id", verificarToken, verificarRol("admin"), actualizarDocente) 

router.delete("/:id", verificarToken, verificarRol("admin"), eliminarDocente)

module.exports = router 