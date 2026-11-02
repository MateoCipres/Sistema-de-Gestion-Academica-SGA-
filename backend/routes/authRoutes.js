const express = require("express")
const router = express.router()

const {login} = require("../controllers/authController")

router.post("/login", login)

module.exports= router