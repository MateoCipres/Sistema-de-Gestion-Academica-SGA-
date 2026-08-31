const express = require("express")
const app = express()
app.use(express.json())

const alumnos = [{
        id: 1,
        nombre: "Mateo",
        carrera: "Programacion"
    },
    {
        id: 2,
        nombre: "Nicolas",
        carrera: "Logistica"
    }
]

app.get("/alumnos", (req, res) => {
    res.json(alumnos)
})

app.get("/alumnos/:id", (req, res) => {
    const id = Number(req.params.id)
    const alumno = alumnos.find(a => a.id === id)
    res.json(alumno)
})


app.post("/alumnos", (req, res) => {
    const nuevoAlumno = req.body
    alumnos.push(nuevoAlumno)
    res.json({ mensaje: "Alumno registrado correctamente" })
    console.log(req.body)
})

app.put("/alumnos/:id", (req, res) => {
    const id = Number(req.params.id)
    const alumno = alumnos.find(alumno => alumno.id === id)
    alumno.id = req.body.id
    alumno.nombre = req.body.nombre
    alumno.carrera = req.body.carrera

})

app.listen(3000, () => {
    console.log("Servidor activo en https://localhost:3000")
})