import { useState } from "react";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import API_URL from "../config/api"
const API_MATERIAS = `${API_URL}/materias`
import { useAuth } from "../context/useAuth"

function FormularioM({ onMateriaCreada, materiaEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        codigo: materiaEditar?.codigo ?? "",
        nombre: materiaEditar?.nombre ?? "",
        descripcion: materiaEditar?.descripcion ?? "",
        cargaHoraria: String(materiaEditar?.cargaHoraria ?? ""),
        estado: materiaEditar?.estado ?? ""
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)
    const { token } = useAuth()

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
        setGuardando(true)

    const editando = Boolean(materiaEditar)
    const materia = editando
                ? {
                    nombre: formulario.nombre,
                    descripcion: formulario.descripcion,
                    cargaHoraria: Number(formulario.cargaHoraria),
                    estado: formulario.estado
                }
                : {
                    ...formulario,
                    cargaHoraria: Number(formulario.cargaHoraria)
                }
    const url = editando
                ? `${API_MATERIAS}/${materiaEditar.codigo}`
                : API_MATERIAS
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(materia)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar la materia. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                codigo: "",
                nombre: "",
                descripcion: "",
                cargaHoraria: "",
                estado: ""
            })
            onMateriaCreada()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
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
                    disabled={Boolean(materiaEditar)}
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
                    value={formulario.cargaHoraria}
                    onChange={manejarCambio}
                    helperText="Horas totales"
                    required
                    fullWidth
                />
                <TextField
                    id="estado"
                    name="estado"
                    label="Estado"
                    placeholder="activa o inactiva"
                    value={formulario.estado}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
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
export default FormularioM
