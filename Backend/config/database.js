const mongoose = require("mongoose")

async function conectarBD() {
    try {
        await mongoose.connect("mongodb://localhost:27017/")
        console.log("Base de datos conectada")
    } catch (error) {
        console.log(error)
    }

}

module.exports = conectarBD