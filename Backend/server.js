// Importa Express, crea la aplicación y habilita la lectura de cuerpos JSON.
const express = require("express")
const app = express()
app.use(express.json())

// Importa las rutas de alumnos y las agrupa bajo el prefijo /alumnos.
const alumnosRoutes = require("./routes/alumnos.routes")
app.use("/alumnos", alumnosRoutes)


// Este middleware registra el método y la URL de cada solicitud y luego
// llama a next() para que la solicitud continúe hacia su ruta correspondiente.
app.use((req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    next()
})

// Inicia el servidor y queda escuchando solicitudes en el puerto 3000.
app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000")
})