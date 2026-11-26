//Define q función tiene que responder a cada petición, segun su endpoint
const express = require("express")
const { verificarToken } = require("../middlewares/authMiddleware")
const { verificarRol } = require("../middlewares/rolMiddleware")
const {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria } = require("../controllers/materias.controller")
const router = express.Router()


router.get("/",verificarToken, obtenerMaterias)

router.get("/:codigo",verificarToken, obtenerMateria)

router.post("/",verificarToken, verificarRol("admin"), crearMateria)

router.put("/:codigo",verificarToken, verificarRol("admin"), actualizarMateria)

router.delete("/:codigo",verificarToken, verificarRol("admin"), eliminarMateria)

module.exports = router
