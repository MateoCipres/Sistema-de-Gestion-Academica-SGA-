import { useState } from "react";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
const API_MATERIAS = "http://localhost:3000/materias"

const FORMULARIO_VACIO = {
    codigo: "",
    nombre: "",
    descripcion: "",
    cargaHoraria: "",
    estado: "activa"
}

function validar(formulario) {
    const codigo = formulario.codigo.trim()
    const nombre = formulario.nombre.trim()
    const cargaHoraria = Number(formulario.cargaHoraria)

    if (codigo === "") {
        return "El código es obligatorio"
    }
    if (!/^[A-Za-z0-9]+$/.test(codigo) || codigo.length > 10) {
        return "El código debe tener hasta 10 letras o números, sin espacios ni símbolos"
    }
    if (nombre === "") {
        return "El nombre es obligatorio"
    }
    if (nombre.length < 3 || nombre.length > 100) {
        return "El nombre debe tener entre 3 y 100 caracteres"
    }
    if (formulario.descripcion.trim().length > 500) {
        return "La descripción no puede superar los 500 caracteres"
    }
    if (String(formulario.cargaHoraria).trim() === "") {
        return "La carga horaria es obligatoria"
    }
    if (!Number.isInteger(cargaHoraria) || cargaHoraria <= 0) {
        return "La carga horaria debe ser un número entero mayor que cero"
    }
    if (!["activa", "inactiva"].includes(formulario.estado)) {
        return "El estado debe ser activa o inactiva"
    }
    return ""
}

function FormularioMateria({ onMateriaCreada, materiaEditar, onCancelar, onLimpiarMensaje }){
    const [formulario, setFormulario] = useState({
        codigo: materiaEditar?.codigo ?? "",
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: String(materiaEditar?.cargaHoraria ?? ""),
        estado: materiaEditar?.estado ?? "activa"
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    function manejarCambio(e) {
        const { name, value} = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        onLimpiarMensaje()

        const errorValidacion = validar(formulario)
        if (errorValidacion) {
            setError(errorValidacion)
            return
        }
        setGuardando(true)

    const materia = {
        codigo: formulario.codigo.trim(),
        nombre: formulario.nombre.trim(),
        descripcion: formulario.descripcion.trim(),
        cargaHoraria: Number(formulario.cargaHoraria),
        estado: formulario.estado
    }
    const editando = Boolean(materiaEditar)
    const url = editando
                ? `${API_MATERIAS}/${materiaEditar.codigo}`
                : API_MATERIAS
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(materia)
            })
            const datos = await respuesta.json().catch(() => ({}))

            if (!respuesta.ok) {
                throw new Error(datos.mensaje || `No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`)
            }

            if (!editando) {
                setFormulario(FORMULARIO_VACIO)
            }
            onMateriaCreada(editando
                ? "Materia modificada correctamente"
                : "Materia registrada correctamente")
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error instanceof TypeError
                ? "No se pudo conectar con el servidor"
                : error.message)
        } finally {
            setGuardando(false)
        }
    }
    function cancelar(){
        onCancelar()
    }
    return(
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                {materiaEditar ? "Editar materia" : "Nueva Materia"}
            </Typography>
            <Box
                component="form"
                onSubmit={guardar}
                noValidate
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                    gap: 2
                }}
            >
                <TextField
                    id="codigo"
                    name="codigo"
                    label="Código"
                    value={formulario.codigo}
                    onChange={manejarCambio}
                    helperText="Ej.: PRG4"
                    required
                    fullWidth
                />
                <TextField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="cargaHoraria"
                    name="cargaHoraria"
                    label="Carga horaria"
                    type="number"
                    value={formulario.cargaHoraria}
                    onChange={manejarCambio}
                    helperText="Horas totales, número entero"
                    required
                    fullWidth
                />
                <TextField
                    id="estado"
                    name="estado"
                    label="Estado"
                    select
                    value={formulario.estado}
                    onChange={manejarCambio}
                    required
                    fullWidth
                >
                    <MenuItem value="activa">Activa</MenuItem>
                    <MenuItem value="inactiva">Inactiva</MenuItem>
                </TextField>
                <TextField
                    id="descripcion"
                    name="descripcion"
                    label="Descripción"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    multiline
                    minRows={2}
                    fullWidth
                    sx={{ gridColumn: "1 / -1" }}
                />
                <Box
                    sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1
                    }}
                >
                    <Button type="submit" variant="contained" disabled={guardando}>
                        {guardando
                            ? "Guardando..."
                            : materiaEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {materiaEditar && (
                        <Button
                            type="button"
                            onClick={cancelar}
                            disabled={guardando}
                            variant="outlined"
                        >
                            Cancelar
                        </Button>
                    )}
                </Box>
                {error && (
                    <Alert severity="error" role="alert" sx={{ gridColumn: "1 / -1" }}>
                        {error}
                    </Alert>
                )}
            </Box>
        </Paper>
    )
}
export default FormularioMateria
