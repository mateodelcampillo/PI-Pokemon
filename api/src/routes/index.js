const { Router } = require('express');
const {Pokemon, Type} = require("../db")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require('express')

const router = Router();
const pokemons = require("./pokemons")
const type = require("./type")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())
router.use("/pokemons", pokemons)
router.use("/types", type)

module.exports = router;
