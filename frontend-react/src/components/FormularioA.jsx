import { useState } from "react";
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import SaveRoundedIcon from "@mui/icons-material/SaveRounded"
const API_ALUMNOS = "http://localhost:3000/alumnos"

function FormularioA({ onAlumnoCreado, alumnoEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        legajo: String(alumnoEditar?.legajo ?? ""),
        nombre: alumnoEditar?.nombre ?? "",
        carrera: alumnoEditar?.carrera ?? "",
        correo: alumnoEditar?.correo ?? ""
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
        setGuardando(true)
        
    const alumno = {
        ...formulario,
        legajo: Number(formulario.legajo)
    }
    const editando = Boolean(alumnoEditar)
    const url = editando 
                ? `${API_ALUMNOS}/${alumnoEditar.legajo}`
                : API_ALUMNOS
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(alumno)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el alumno. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                legajo: "",
                nombre: "",
                carrera: "",
                correo: ""
            })
            onAlumnoCreado()
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
        elevation={0}
        sx={{
            p: { xs: 2.5, sm: 3 },
            border: 1,
            borderColor: alumnoEditar ? "secondary.main" : "divider",
            borderRadius: 2,
            transition: "border-color 0.2s"
        }}
        >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3 }}>
            <Avatar sx={{
                bgcolor: alumnoEditar ? "secondary.main" : "primary.main",
                color: alumnoEditar ? "secondary.contrastText" : "primary.contrastText"
            }}>
                {alumnoEditar ? <EditRoundedIcon /> : <PersonAddAlt1RoundedIcon />}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
                <Typography variant="h5" component="h2">
                    {alumnoEditar ? "Editar alumno" : "Nuevo Alumno"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {alumnoEditar
                    ? `Modificando el legajo ${alumnoEditar.legajo}`
                    : "Completá los datos para registrarlo"}
                </Typography>
            </Box>
        </Stack>
        <Box
        component="form"
        onSubmit={guardar}
        sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "1fr" }
        }}
        >
            <TextField
            id="legajo"
            name="legajo"
            label="Legajo"
            value={formulario.legajo}
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
            id="carrera"
            name="carrera"
            label="Carrera"
            value={formulario.carrera}
            onChange={manejarCambio}
            required
            fullWidth
            />
            <TextField
            id="correo"
            name="correo"
            label="Correo"
            value={formulario.correo}
            onChange={manejarCambio}
            required
            fullWidth
            />
            <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ gridColumn: "1 / -1", justifyContent: "flex-end", mt: 1 }}
            >
                <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveRoundedIcon />}
                disabled={guardando}
                >
                    {guardando
                    ? "Guardando..."
                    : alumnoEditar
                        ? "Guardar cambios"
                        : "Guardar"}
                </Button>
                {alumnoEditar && (
                    <Button
                    type="button"
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={cancelar}
                    disabled={guardando}
                    >
                        Cancelar
                    </Button>
                )}
            </Stack>
            {error && (
                <Alert severity="error" variant="outlined" sx={{ gridColumn: "1 / -1" }}>
                    {error}
                </Alert>
            )}
        </Box>
        </Paper>
    )
}
export default FormularioA