//Define q función tiene que responder a cada petición, segun su endpoint
const express = require("express")
const { verificarToken } = require("../middlewares/authMidleware")
const {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria } = require("../controllers/materias.controller")
const router = express.Router()


router.get("/",verificarToken, obtenerMaterias)

router.get("/:codigo",verificarToken, obtenerMateria)

router.post("/",verificarToken, crearMateria)

router.put("/:codigo",verificarToken, actualizarMateria)

router.delete("/:codigo",verificarToken, eliminarMateria)

module.exports = router
