const Materia = require("../models/Materia")

const ESTADOS = ["activa", "inactiva"]

function normalizarCodigo(codigo) {
    return String(codigo).trim().toUpperCase()
}

function validarMateria(datos) {
    const { codigo, nombre, descripcion, cargaHoraria, estado } = datos
    if (typeof codigo !== "string" || codigo.trim() === "") {
        return "El código es obligatorio"
    }
    if (typeof nombre !== "string" || nombre.trim() === "") {
        return "El nombre es obligatorio"
    }
    if (descripcion !== undefined && typeof descripcion !== "string") {
        return "La descripción debe ser un texto"
    }
    if (cargaHoraria === undefined || cargaHoraria === null || cargaHoraria === "") {
        return "La carga horaria es obligatoria"
    }
    if (typeof cargaHoraria !== "number") {
        return "La carga horaria debe ser un número"
    }
    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return "La carga horaria debe ser un número entero mayor que cero"
    }
    if (!ESTADOS.includes(estado)) {
        return "El estado debe ser activa o inactiva"
    }
    return null
}

function manejarError(error, res) {
    if (error.code === 11000) {
        return res.status(409).json({
            mensaje: "Ya existe una materia con ese código"
        })
    }
    if (error.name === "ValidationError") {
        const primerError = Object.values(error.errors)[0]
        return res.status(400).json({
            mensaje: primerError.message
        })
    }
    console.error(error)
    res.status(500).json({
        mensaje: "Error interno del servidor"
    })
}

async function obtenerMaterias(req, res) {
    try {
        const materias = await Materia.find()
        res.json(materias)
    } catch (error) {
        manejarError(error, res)
    }
}

async function obtenerMateria(req, res) {
    try {
        const materia = await Materia.findOne({
            codigo: normalizarCodigo(req.params.codigo)
        })
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json(materia)
    } catch (error) {
        manejarError(error, res)
    }
}

async function crearMateria(req, res) {
    const errorValidacion = validarMateria(req.body)
    if (errorValidacion) {
        return res.status(400).json({
            mensaje: errorValidacion
        })
    }
    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
    try {
        const existe = await Materia.findOne({
            codigo: normalizarCodigo(codigo)
        })
        if (existe) {
            return res.status(409).json({
                mensaje: "Ya existe una materia con ese código"
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
    } catch (error) {
        manejarError(error, res)
    }
}

async function actualizarMateria(req, res) {
    const errorValidacion = validarMateria(req.body)
    if (errorValidacion) {
        return res.status(400).json({
            mensaje: errorValidacion
        })
    }
    const { codigo, nombre, descripcion, cargaHoraria, estado } = req.body
    const codigoActual = normalizarCodigo(req.params.codigo)
    const codigoNuevo = normalizarCodigo(codigo)
    try {
        const materiaActual = await Materia.findOne({
            codigo: codigoActual
        })
        if (!materiaActual) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        if (codigoNuevo !== codigoActual) {
            const existe = await Materia.findOne({
                codigo: codigoNuevo
            })
            if (existe) {
                return res.status(409).json({
                    mensaje: "Ya existe otra materia con ese código"
                })
            }
        }
        const materia = await Materia.findOneAndUpdate(
            { codigo: codigoActual },
            { codigo, nombre, descripcion: descripcion ?? "", cargaHoraria, estado },
            { returnDocument: "after", runValidators: true }
        )
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json(materia)
    } catch (error) {
        manejarError(error, res)
    }
}

async function eliminarMateria(req, res) {
    try {
        const materia = await Materia.findOneAndDelete({
            codigo: normalizarCodigo(req.params.codigo)
        })
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            })
        }
        res.json({ mensaje: "Materia eliminada correctamente" })
    } catch (error) {
        manejarError(error, res)
    }
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    actualizarMateria,
    eliminarMateria
}
