const axios = require("axios")
const { Router } = require("express");
// const Type = require("../models/Type");
const {Pokemon, Type} = require("../db")
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = Router()


router.get("/", async (req, res) => {
   
    if(req.query.name){
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`)
                .then(d => d.json())
                .then(p => {
                    return {
                        id_Pokemon: p.id,
                        name: p.name,
                        types: p.types.map(t => t.type.name),
                        image: p.sprites.other["official-artwork"].front_default,
                        height: p.height,
                        weight: p.weight,
                        health: p.stats[0].base_stat,
                        attack: p.stats[1].base_stat,
                        defense: p.stats[2].base_stat,
                        speed: p.stats[5].base_stat
                    }
                })
                res.send(response)
        } catch (error) {
            console.log("No existe")
            res.status(404).send("No existe")
        }
    }
    else
    try {

        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40")
            .then(d => d.json())
            .then(data => Promise.all(data.results.map(p => fetch(p.url)
                .then(d => d.json()))))
        pokemons = response.map(p => {
            return {
                id_Pokemon: p.id,
                name: p.name,
                types: p.types.map(t => t.type.name),
                image: p.sprites.other["official-artwork"].front_default,
                height: p.height,
                weight: p.weight,
                health: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense: p.stats[2].base_stat,
                speed: p.stats[5].base_stat
            }
        })
        
        res.json(pokemons)
    } catch (error) {
        res.send(console.log(error))
    }
})

router.get("/:id", async (req, res) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
            .then(d => d.json())
            .then(p => {
                return {
                    id_Pokemon: p.id,
                    name: p.name,
                    types: p.types.map(t => t.type.name),
                    image: p.sprites.other["official-artwork"].front_default,
                    height: p.height,
                    weight: p.weight,
                    health: p.stats[0].base_stat,
                    attack: p.stats[1].base_stat,
                    defense: p.stats[2].base_stat,
                    speed: p.stats[5].base_stat
                }
            })
            res.send(response)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


router.post("/", async(req,res) => {
    try{
        if(req.body.name !== "" && req.body.types !== "" && req.body.height !== ""){
            let types = await Type.findAll({
                where:{
                    name: req.body.types
                }
            })
            const pokemon = await Pokemon.create(req.body)
            const ju = await pokemon.addTypes(types)
            const test = await Pokemon.findAll()
            console.log(ju)
            res.send(test)
        }
    }
    catch(e){
        res.status(404).send(`El error ${e}`)
    }
})
module.exports = router;
