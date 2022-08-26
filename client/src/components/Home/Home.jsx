import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { filteredPokemons, filteredTypePokemons, getAllPokemons, getSearchPokemon } from '../../redux/actions'
import PokemonCard from '../PokemonCard/PokemonCard'
import PokemonDetail from '../PokemonDetail/PokemonDetail'


function Home() {
  const dispatch = useDispatch()
  const statePokemons = useSelector(state => state.pokemons)
  const stateTypes = useSelector(state => state.types)

  // LOCAL STATE
  const [searchPoke, setSearchPoke] = useState([])
  const [updates, setUpdates] = useState([])
  const [copyPokemons, setCopyPokemons] = useState()
  

 // SEARCH FUNCTION
  const handleOnChange = (e) => {
    e.preventDefault()
    setSearchPoke(e.target.value.toLowerCase())
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getSearchPokemon(searchPoke))
  
  }
  //  ABC FILTER
  function abcFilter(e) {
    if (e.target.value === "asc") {
      dispatch(filteredPokemons(e.target.value))
      setUpdates(["A-Z FILTER"])
    }
    else {
      dispatch(filteredPokemons(e.target.value))
      setUpdates(["Z-A FILTER"])
    }

  }
  // TYPE FILTER
  function typeFilter(e) {
    dispatch(filteredTypePokemons(e.target.value))
    setUpdates(["Z-A FILTER"])

  }
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input onChange={handleOnChange}></input>
        <button>Search</button>
      </form>
      <button onClick={(e) => {
        e.preventDefault()
        dispatch(getAllPokemons())
      }}>RESET</button>
      <button><Link to="/pokemons/create">CREATE POKEMON</Link></button>
      <select name="abcFilter" onChange={abcFilter}>
        <option>Orden Alfabatico</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select name="typeFilter" onChange={typeFilter}>
        <option>Types:</option>
        {stateTypes?.map(t => <option value={t.name}>{t.name}</option>)}
      </select>
      <h1>POKEMONS</h1>

      {Object.keys(statePokemons).length > 0 && statePokemons ?
       
        statePokemons?.map((e, index) =>
          <PokemonCard
            key={index}
            id={e.id_Pokemon}
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
