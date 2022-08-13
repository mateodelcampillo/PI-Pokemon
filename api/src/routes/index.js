const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require('express')

const router = Router();
const pokemon = require("./pokemon")
const type = require("./type")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())
router.use("pokemon", pokemon)
router.use("type", type)

module.exports = router;
