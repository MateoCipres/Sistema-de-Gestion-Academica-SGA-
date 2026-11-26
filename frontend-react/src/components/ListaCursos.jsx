import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import API_URL from "../config/api"
const API_CURSOS = `${API_URL}/cursos`
import { useAuth } from "../context/useAuth"

export function ListaCursos({ actualizar, onCursoCreado, onEditarCurso }) {
    const [cursos, setCursos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    const { token, usuario } = useAuth()

    async function eliminarCurso(codigo){
        const confirmar = window.confirm("¿Seguro que querés eliminar este curso?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_CURSOS}/${codigo}`, 
                { method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onCursoCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo elimnar el curso")
        }
    }
    useEffect(() => {
        async function cargarCursos(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_CURSOS, {
                headers: {Authorization: `Bearer ${token}`}
            })

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setCursos(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de cursos.")
        } finally {
            setCargando(false)
        }
    }
        cargarCursos()
    }, [actualizar, token])

    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando cursos...</Typography>
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
                Cursos
            </Typography>
            {cursos.length === 0
                ? (
                    <Typography color="text.secondary">
                        No hay cursos registrados.
                    </Typography>
                )
                : (
                    <Stack
                        component="ul"
                        spacing={1.5}
                        sx={{ listStyle: "none", p: 0, m: 0 }}
                    >
                        {cursos.map(curso => (
                            <Paper
                                component="li"
                                key={curso.codigo}
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
                                    <Chip label={curso.codigo} color="primary" variant="outlined" size="small" />
                                    <Box>
                                        <Typography fontWeight={600}>{curso.nombre}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                        {curso.descripcion} · {curso.duracion} hs
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                    {usuario?.rol === "admin" && (
                                    <Button
                                        type="button"
                                        onClick={() => onEditarCurso(curso)}
                                        variant="outlined"
                                        size="small"
                                    >
                                        Editar
                                    </Button>
                                    )}
                                    {usuario?.rol === "admin" && (
                                    <Button
                                        type="button"
                                        onClick={() => eliminarCurso(curso.codigo)}
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                    >
                                        Eliminar
                                    </Button>
                                    )}
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                )}
        </Paper>
    )
}