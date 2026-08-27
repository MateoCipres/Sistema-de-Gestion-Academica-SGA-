const express = require("express")
const app = express()

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

app.listen(3000, () => {
    console.log("Servidor activo en https://localhost:3000")
})