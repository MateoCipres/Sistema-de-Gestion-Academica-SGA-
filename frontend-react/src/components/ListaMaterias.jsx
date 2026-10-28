import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const API_MATERIAS = "http://localhost:3000/materias"

export function ListaMaterias({ actualizar, onMateriaCreada, onEditarMateria }) {
    const [materias, setMaterias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarMateria(materia){
        const confirmar = window.confirm(`¿Seguro que querés eliminar la materia ${materia.codigo} - ${materia.nombre}?`)
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_MATERIAS}/${materia.codigo}`,
                { method: "DELETE" }
            )
            const datos = await respuesta.json().catch(() => ({}))
            if (!respuesta.ok) {
                throw new Error(datos.mensaje || `No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onMateriaCreada(datos.mensaje || "Materia eliminada correctamente")
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error instanceof TypeError
                ? "No se pudo conectar con el servidor"
                : error.message)
        }
    }
    useEffect(() => {
        async function cargarMaterias(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_MATERIAS)

            if (!respuesta.ok){
                throw new Error(`No se pudo obtener la lista. Estado HTTP: ${respuesta.status}`)
            }

            const datos = await respuesta.json()
            setMaterias(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de materias. Verificá que el servidor esté funcionando.")
        } finally {
            setCargando(false)
        }
    }
        cargarMaterias()
    }, [actualizar])

    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando materias...</Typography>
            </Paper>
        )
    }
    if (error) {
        return <Alert severity="error" role="alert">{error}</Alert>
    }
    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.5, sm: 3.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                bgcolor: "background.paper"
            }}
        >
            <Typography component="h2" variant="h5" sx={{ mb: 2.5, fontWeight: 700 }}>
                Materias
            </Typography>
            {materias.length === 0
                ? (
                    <Typography color="text.secondary">
                        No hay materias registradas.
                    </Typography>
                )
                : (
                    <Stack
                        component="ul"
                        spacing={1.5}
                        sx={{ listStyle: "none", p: 0, m: 0 }}
                    >
                        {materias.map(materia => (
                            <Paper
                                component="li"
                                key={materia.codigo}
                                elevation={0}
                                sx={{
                                    p: { xs: 2, sm: 2.5 },
                                    border: 1,
                                    borderColor: "divider",
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: { xs: "stretch", sm: "center" },
                                    justifyContent: "space-between",
                                    flexDirection: { xs: "column", sm: "row" },
                                    gap: 2
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{ alignItems: "center", flexWrap: "wrap" }}
                                >
                                    <Chip label={materia.codigo} color="primary" variant="outlined" size="small" />
                                    <Box>
                                        <Typography fontWeight={600}>{materia.nombre}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {materia.cargaHoraria} hs
                                            {materia.descripcion && ` · ${materia.descripcion}`}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={materia.estado === "activa" ? "Activa" : "Inactiva"}
                                        color={materia.estado === "activa" ? "success" : "default"}
                                        size="small"
                                    />
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                    <Button
                                        type="button"
                                        onClick={() => onEditarMateria(materia)}
                                        variant="outlined"
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => eliminarMateria(materia)}
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                    >
                                        Eliminar
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                )}
        </Paper>
    )
}
