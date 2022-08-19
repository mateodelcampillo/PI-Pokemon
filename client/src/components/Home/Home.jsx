import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { getAllPokemons, getSearchPokemon } from '../../redux/actions'
import PokemonCard from '../PokemonCard/PokemonCard'
import PokemonDetail from '../PokemonDetail/PokemonDetail'


function Home() {
  const dispatch = useDispatch()
  const statePokemons = useSelector(state => state.pokemons)
  const [searchPoke, setSearchPoke] = useState([])

  // SEARCH FUNCTION
 const handleOnChange = (e)=> {
  e.preventDefault()
  setSearchPoke(e.target.value)
}
const handleOnSubmit = (e)=> {
  e.preventDefault()
  dispatch(getSearchPokemon(searchPoke))
}
 

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input onChange={handleOnChange}></input>
        <button>Search</button>
      </form>
      <button onClick={(e)=>{
        e.preventDefault()
        dispatch(getAllPokemons())
      }}>RESET</button>
      <h1>POKEMONS</h1>

      {Object.keys(statePokemons).length > 0  && statePokemons?
        statePokemons?.map((e,index) =>
          <PokemonCard
            key={index}
            id= {e.id_Pokemon}
            name={e.name}
            image={e.image}
            types={e.types}
            health={e.health}
            attack={e.attack}
            defense={e.defense}
            speed={e.speed}
            weight={e.weight}
            height={e.height}
          />

        ) : <div>Puto el que lee</div>}
    </>
  )
}



export default Home
