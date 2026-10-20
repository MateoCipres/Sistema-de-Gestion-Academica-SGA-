// Carga las variables definidas en .env dentro de process.env antes de configurar el servidor.
require("dotenv").config()

// Dependencias de HTTP, permisos entre orígenes, conexión a MongoDB y rutas de alumnos.
const express = require("express")
const cors = require("cors")

const conectarDB = require("./config/database")
const alumnosRoutes = require("./routes/alumnos.routes")

// Crea la aplicación y registra middleware antes de montar las rutas.
const app = express()

// Interpreta cuerpos JSON y permite solicitudes desde otros orígenes, como el frontend local.
app.use(express.json())
app.use(cors())
    // Todas las rutas del router de alumnos quedan agrupadas bajo /alumnos.
app.use("/alumnos", alumnosRoutes)

// El puerto se configura mediante la variable PORT del entorno.
const PORT = process.env.PORT

// Inicia la conexión a MongoDB; la API usa el modelo Alumno para consultar la colección.
conectarDB()

console.log("Ejecutado con nodemon")

// Mantiene el proceso escuchando solicitudes HTTP y confirma la dirección en la consola.
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})


// Creo un middleware
// app.use((req, res, next) => {
//     console.log(req.method)
//     console.log(req.url)
//     next()
// })