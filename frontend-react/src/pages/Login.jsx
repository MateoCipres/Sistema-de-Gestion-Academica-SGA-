import { useState } from "react"
import {Alert, Box, Button, TextField, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles" 
import { useAuth } from "../context/useAuth"
import { useNavigate } from "react-router-dom"
import API_URL from "../config/api"

export default function Login() {
    const navigate = useNavigate()
    const { setToken, usuario, setUsuario } = useAuth()

    const theme = useTheme()

    const [ error, setError] = useState("")
    const [ cargando, setCargando ] = useState(false)
    const [ mensaje, setMensaje ] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function login(e) {
        e.preventDefault()
        setError("")
        setCargando(true)
        setMensaje("")

        try {
            const respuesta = await fetch(`${API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({ email, password })
                }
            )
            const datos = await respuesta.json()
            if (!respuesta.ok) {
                throw new Error(datos.mensaje || "No se pudo iniciar sesión")
            }
            localStorage.setItem("token", datos.token)
            localStorage.setItem("usuario", datos.usuario)
            setToken(datos.token)

            setUsuario(datos)
            setMensaje(datos.mensaje)

            setEmail("")
            setPassword("")

            navigate("/")

        } catch (error) {
            console.error("Error en login: ", error)
            setError(error.message || "No se pudo conectar con el servidor.")
        } finally {
            setCargando(false)
        }
    }
    return (
        <Box component="main" 
        sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            backgroundColor: theme.palette.background.default, 
        }}
        >
            <Box component="form" 
            onSubmit={login}
            sx={{
                width: "100%",
                maxWidth: 420,
                p: 4,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: `0 12px 32px ${theme.palette.divider}`
            }}
            >
            <Typography variant="h4" component="h1" 
            sx={{
                mb: 3,
                textAlign: "center",
                color: theme.palette.text.primary,
                fontWeight: 700,
            }}>
                Iniciar sesión
            </Typography>
            <TextField 
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            fullWidth
            margin="normal"
            sx={{ 
                "& .MuiOutlinedInput-root": {borderRadius: 2,},
            }}
            />
            <TextField 
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            fullWidth
            margin="normal"
            sx={{ "& .MuiOutlinedInput-root": {borderRadius: 2,},
        }} // aplica un borde redondeado al campo de contraseña
            />
            {error && (
                <Alert severity="error" sx={{mt: 2, borderRadius: 2}}>
                    {error}
                </Alert>
            )}
            {mensaje && (
                <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                    {mensaje}
                </Alert>
            )}
            <Button 
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled= {cargando}
            sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight:700,
            }}
            >
                {cargando ? "Ingresando..." : "Ingresar"}
            </Button>
            {usuario && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1">
                        Bienvenido/a, {usuario.nombre}
                    </Typography>
                    <Typography variant="body2">
                        Correo: {usuario.email}
                    </Typography>
                    <Typography variant="body2">
                        Rol: {usuario.rol}
                    </Typography>
                </Box>
            )}
            </Box>
        </Box>
    )
}