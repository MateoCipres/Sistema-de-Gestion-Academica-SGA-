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

app.listen(3000, () => {
    console.log("Servidor activo en https://localhost:3000")
})