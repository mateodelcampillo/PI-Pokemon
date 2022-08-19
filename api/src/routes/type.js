const axios = require("axios")
const { Router } = require("express")
const {Type} = require("../db")
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const router = Router()

router.get("/",  async(req,res) => {
   
    const response =  await fetch("https://pokeapi.co/api/v2/type")
    .then(d => d.json())
    .then(d => d)
    const api = response.results
    
    const yet = await Type.findAll()
    if(yet.length === 0)
    {try {
        const tp = await Type.bulkCreate(api)
        res.json(tp)
    } catch (error) {
        console.log(error)
        res.send(error)
    }}
    else{
    res.send(yet)
    }
})

module.exports = router;