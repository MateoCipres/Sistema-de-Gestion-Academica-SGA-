const Materia = require("../models/Materia")

async function obtenerMaterias(req, res) {
    const materias = await Materia.find()
    res.json(materias)
}

async function obtenerMateria(req, res) {
    const materia = await Materia.findOne({
        codigo: req.params.codigo
    })
    if (!materia) {
        return res.status(404).json({
            mensaje: "Materia no encontrada"
        })
    }
    res.json(materia)
}

async function crearMateria(req, res) {
    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
    if (!codigo || !nombre || !cargaHoraria || !estado) {
        return res.status(400).json({
            mensaje: "Todos los campos obligatorios"
        })
    }
    if (typeof codigo !== "string") {
        return res.status(400).json({
            mensaje: "El código debe ser un texto"
        })
    }
    if (typeof nombre !== "string") {
        return res.status(400).json({
            mensaje: "El nombre debe ser un texto"
        })
    }
    if (typeof cargaHoraria !== "number") {
        return res.status(400).json({
            mensaje: "La carga horaria debe ser un número"
        })
    }
    if (cargaHoraria <= 0) {
        return res.status(400).json({
            mensaje: "La carga horaria debe ser mayor a 0"
        })
    }
    if (estado !== "activa" && estado !== "inactiva") {
        return res.status(400).json({
            mensaje: "El estado debe ser activa o inactiva"
        })
    }
    const existe = await Materia.findOne({
        codigo
    })
    if (existe) {
        return res.status(400).json({
            mensaje: "El código ya existe"
        })
    }
    const nuevaMateria = await Materia.create({
        codigo,
        nombre,
        descripcion,
        cargaHoraria,
        estado
    })
    res.status(201).json(nuevaMateria)
}

async function actualizarMateria(req, res) {
    const { nombre, descripcion, cargaHoraria, estado } = req.body

    if (cargaHoraria <= 0) {
        return res.status(400).json({
            mensaje: "La carga horaria debe ser mayor a 0"
        })
    }
    if (estado !== "activa" && estado !== "inactiva") {
        return res.status(400).json({
            mensaje: "El estado debe ser activa o inactiva"
        })
    }

    const materia = await Materia.findOneAndUpdate(
        { codigo: req.params.codigo },
        { nombre, descripcion, cargaHoraria, estado },
        { returnDocument: "after" }
    )
    if (!materia) {
        return res.status(404).json({
            mensaje: "Materia no encontrada"
        })
    }

    res.json(materia)
}

async function eliminarMateria(req, res) {
    const materia = await Materia.findOneAndDelete(
        { codigo: req.params.codigo }
    )
    if (!materia) {
        return res.status(404).json({
            mensaje: "Materia no encontrada"
        })
    }

    res.json({ mensaje: "Materia eliminada correctamente" })
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}
