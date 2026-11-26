import { useState } from "react";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import API_URL from "../config/api";
const API_CURSOS = `${API_URL}/cursos`
import { useAuth } from "../context/useAuth";

function FormularioC({ onCursoCreado, cursoEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        codigo: String(cursoEditar?.codigo ?? ""),
        nombre: cursoEditar?.nombre ?? "",
        descripcion: cursoEditar?.descripcion ?? "",
        duracion: cursoEditar?.duracion ?? ""
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
        
    const curso = {
        ...formulario,
        duracion: Number(formulario.duracion)
    }
    const editando = Boolean(cursoEditar)
    const url = editando 
                ? `${API_CURSOS}/${cursoEditar.codigo}`
                : API_CURSOS
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(curso)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el curso. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                codigo: "",
                nombre: "",
                descripcion: "",
                duracion: ""
            })
            onCursoCreado(editando ? "Modificado" : "Creado") 
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
                {cursoEditar ? "Editar curso" : "Nuevo Curso"}
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
                    label="Codigo"
                    value={formulario.codigo}
                    onChange={manejarCambio}
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
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    required
                    fullWidth
                />
                <TextField
                    id="duracion"
                    name="duracion"
                    label="Duracion"
                    value={formulario.duracion}
                    onChange={manejarCambio}
                    required
                    fullWidth
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
                            : cursoEditar
                                ? "Guardar cambios"
                                : "Guardar"}
                    </Button>
                    {cursoEditar && (
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
export default FormularioC