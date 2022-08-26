const axios = require("axios")
const { Router } = require("express");
const { Op } = require("sequelize")
// const Type = require("../models/Type");
const { Pokemon, Type } = require("../db")
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = Router()


router.get("/", async (req, res) => {
    const dbPokemons = await Pokemon.findAll({
        include: [{ model: Type, attributes: ["name"], through: { attributes: [] } }]
    })
    const pokemonsDB = dbPokemons?.map(
        p => {
        
            return {
                id_Pokemon: p.id_Pokemon,
                name: p.name,
                types: p.types.map(p => p.name),   
                image: p.image,
                health: p.health,
                attack: p.attack,
                defense: p.defense,
                speed: p.speed ,
                height: p.height, 
                weight: p.weight 
            }
        }
    )
    if (req.query.name) {
        const searchDb = await Pokemon.findAll({
            where: {
                name: { [Op.iLike]: `%${req.query.name}%` }
            },
            include: {
                model: Type,
                attributes: ["name"],
                through: { attributes: [] }
            }
        })
        console.log("ESTO ->",req.query.name)
        try {
        if (searchDb.length > 0 && req.query.name !== "") {
               
                    res.send(...searchDb)
               
            }else{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`)
                .then(d => d.json())
                .then(p => {
                 
                    return {
                        id_Pokemon: p.id,
                        name: p.name,
                        types: p.types.map(t => t.type.name),
                        image: p.sprites.other["dream_world"].front_default,
                        height: p.height,
                        weight: p.weight,
                        health: p.stats[0].base_stat,
                        attack: p.stats[1].base_stat,
                        defense: p.stats[2].base_stat,
                        speed: p.stats[5].base_stat
                    }
                })
            
                res.send(response)
        }} catch (error) {
            console.log(error)
            res.status(404).send("No existe")
        }
    } else
    // else if
    // (dbPokemons.length > 0 ){
    //     try {
    //         res.json([...response, ...dbPokemons])
    //     } catch (e) {
    //         res.send(e)
    //     }
    // }
    // else
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
                image: p.sprites.other["dream_world"].front_default,
                height: p.height,
                weight: p.weight,
                health: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense: p.stats[2].base_stat,
                speed: p.stats[5].base_stat
            }
        })
        if (dbPokemons.length > 0) {
            try {
                res.json([...pokemonsDB, ...pokemons])
            } catch (e) {
                res.send(e)
            }
        } else
            res.json(pokemons)
    } catch (error) {
        res.send(error)
    }
})

router.get("/:id", async (req, res) => {
    let str = req.params.id.toString()
    if(str.length > 9)
    {const idDB = await Pokemon.findOne({
            where:{
                id_Pokemon: req.params.id
            },
            include: {
                model: Type,
                attributes: ["name"],
                through: { attributes: [] }
            }
        })
    try {
                res.send(idDB)
        }
        catch(e){
            res.send(e)
        }}
        else
       { 
        try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
            .then(d => d.json())
            .then(p => {
                return {
                    id_Pokemon: p.id,
                    name: p.name,
                    types: p.types.map(t => t.type.name),
                    image: p.sprites.other["dream_world"].front_default,
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
       console.log("EL ERROR -> ", error)
        res.status(404).send(error)
    }
}})


router.post("/", async (req, res) => {
    try {
        if (req.body.name !== "" && req.body.types !== "" && req.body.height !== "") {
            let types = await Type.findAll({
                where: {
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
    catch (e) {
        res.status(404).send(`El error ${e}`)
    }
})



module.exports = router;
