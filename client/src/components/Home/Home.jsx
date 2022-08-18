import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import PokemonCard from '../PokemonCard/PokemonCard'
import PokemonDetail from '../PokemonDetail/PokemonDetail'


function Home() {
  const disptach = useDispatch()
  const statePokemons = useSelector(state => state.pokemons)

  return (
    <>
      <div>Home</div>

      {Object.keys(statePokemons).length > 0 ? 
      statePokemons.map(e => 
      <PokemonCard
      key={e.id}
      id={e.id}
      name={e.name}
      image={e.image}
      types={e.types}/>
      ):<div>Puto</div>}
    </>
  )
}



export default Home
