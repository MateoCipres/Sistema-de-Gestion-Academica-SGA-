import { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import CircularProgress from "@mui/material/CircularProgress"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded"
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded"
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded"
const API_ALUMNOS = "http://localhost:3000/alumnos"

export function ListaAlumnos({ actualizar, onAlumnoCreado, onEditarAlumno }) {
    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarAlumno(legajo){
        const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, 
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onAlumnoCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo elimnar alumno")
        }
    }
    useEffect(() => {
        async function cargarAlumnos(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_ALUMNOS)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setAlumnos(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de alumnos.")
        } finally {
            setCargando(false)
        }
    }
        cargarAlumnos()
    }, [actualizar])

    // Estilo compartido por los distintos estados de la lista
    const tarjeta = {
        p: { xs: 2.5, sm: 3 },
        border: 1,
        borderColor: "divider",
        borderRadius: 2
    }

    if (cargando) {
        return (
        <Paper elevation={0} sx={tarjeta}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "center", py: 6 }}>
                <CircularProgress size={24} />
                <Typography color="text.secondary">Cargando alumnos...</Typography>
            </Stack>
        </Paper>
        )
    }
    if (error) {
        return (
        <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>
            {error}
        </Alert>
        )
    }
    return (
    <Paper component="section" elevation={0} sx={tarjeta}>
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
            <GroupsRoundedIcon />
        </Avatar>
        <Typography variant="h5" component="h2" sx={{ flexGrow: 1 }}>
            Alumnos
        </Typography>
        <Chip
        label={`${alumnos.length} ${alumnos.length === 1 ? "registro" : "registros"}`}
        size="small"
        variant="outlined"
        />
    </Stack>
    {alumnos.length === 0
    ? (
        <Stack spacing={1} sx={{
            alignItems: "center",
            textAlign: "center",
            py: 6,
            px: 2,
            border: 1,
            borderStyle: "dashed",
            borderColor: "divider",
            borderRadius: 2,
            color: "text.secondary"
        }}>
            <PersonSearchRoundedIcon sx={{ fontSize: 40, opacity: 0.6 }} />
            <Typography>No hay alumnos registrados.</Typography>
        </Stack>
    )
    : (
        <List disablePadding>
        {alumnos.map(alumno => (
            <ListItem
            key={alumno.legajo}
            divider
            disableGutters
            sx={{
                py: 1.5,
                gap: 2,
                flexWrap: { xs: "wrap", sm: "nowrap" },
                "&:last-of-type": { borderBottom: 0 }
            }}
            >
            <Avatar sx={{
                bgcolor: "action.selected",
                color: "text.primary",
                fontWeight: 700,
                width: 44,
                height: 44
            }}>
                {String(alumno.nombre ?? "?").charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 600, overflowWrap: "anywhere" }}>
                    {alumno.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: "anywhere" }}>
                    Legajo {alumno.legajo} · {alumno.carrera}
                </Typography>
            </Box>
            <Stack
            direction="row"
            spacing={1}
            sx={{ width: { xs: "100%", sm: "auto" }, justifyContent: "flex-end", flexShrink: 0 }}
            >
                <Button
                type="button"
                size="small"
                variant="outlined"
                startIcon={<EditRoundedIcon />}
                onClick={() => onEditarAlumno(alumno)}>
                    Editar
                </Button>
                <Button
                type="button"
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineRoundedIcon />}
                onClick={()=> eliminarAlumno(alumno.legajo)}
                >
                    Eliminar
                </Button>
            </Stack>
        </ListItem>)
    )}
    </List>
    )}
    </Paper>
    )
}