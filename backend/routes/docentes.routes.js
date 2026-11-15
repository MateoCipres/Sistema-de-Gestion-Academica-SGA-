const express = require("express") 
// const alumnosController = require("../controllers/alumnos.controller")
const { verificarToken } = require("../middlewares/authMidleware")
const { 
    obtenerDocentes, 
    obtenerDocente, 
    crearDocente, 
    actualizarDocente, 
    eliminarDocente } = require("../controllers/docentes.controller")
const router = express.Router() 

router.get("/", verificarToken, obtenerDocentes) 

router.get("/:id", verificarToken, obtenerDocente) 

router.post("/", verificarToken, crearDocente) 

router.put("/:id", verificarToken, actualizarDocente) 

router.delete("/:id", verificarToken, eliminarDocente) 

module.exports = router 