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
router.get("/created", async(req, res) =>{
    const dbPokemons = await Pokemon.findAll({
             include: [{ model: Type, attributes: ["name"], through: { attributes: [] } }]
         }) 
     try {
         
         if(dbPokemons.length > 0){
         res.send([...dbPokemons])}
         else{
         alert("No hay Pokemons creados")
         res.send("No hay nda")
             
         }
     } catch (error) {
         res.send(error)
         console.log(error)
     }
 })
module.exports = router;
