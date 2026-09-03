// Importa Express y crea la aplicación HTTP del backend.
const express = require("express")
const app = express()

// Permite interpretar cuerpos de solicitudes que contienen datos JSON.
app.use(express.json())

// Registra las rutas de alumnos bajo el prefijo /alumnos.
const alumnosRoutes = require("./routes/alumnos.routes")
app.use("/alumnos", alumnosRoutes)

// Middleware de registro: muestra el método y la URL de cada solicitud que lo atraviesa.
app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    next()
})

// Inicia el servidor y queda escuchando solicitudes en el puerto 3000.

app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000")
})