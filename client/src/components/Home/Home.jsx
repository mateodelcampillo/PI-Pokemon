import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { filteredAttackPokemons, filteredPokemons, filteredTypePokemons, getAllPokemons, getSearchPokemon } from '../../redux/actions'
import PokemonCard from '../PokemonCard/PokemonCard'
import PokemonDetail from '../PokemonDetail/PokemonDetail'


function Home() {
  const dispatch = useDispatch()
  const statePokemons = useSelector(state => state.pokemons)
  const stateTypes = useSelector(state => state.types)

  // LOCAL STATE
  const [searchPoke, setSearchPoke] = useState([])
  const [updates, setUpdates] = useState([])
  
  

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
    if(e.target.value === "reset"){
      dispatch(getAllPokemons())
    }
    else if (e.target.value === "asc") {
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
    if(e.target.value === "reset"){
      dispatch(getAllPokemons())
    }else
    dispatch(filteredTypePokemons(e.target.value))
    setUpdates(["TYPE FILTER"])

  }
  // ATTACK FILTER
  function attackFilter(e){
    if(e.target.value === "reset"){
      dispatch(getAllPokemons())
    }else
    dispatch(filteredAttackPokemons(e.target.value))
    setUpdates(["ATTACK FILTER"])

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
        <option value="reset">Orden Alfabatico</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select name="typeFilter" onChange={typeFilter}>
        <option value="reset">Types:</option>
        {stateTypes?.map(t => <option value={t.name}>{t.name}</option>)}
      </select>
      <select name="attackFilter" onChange={attackFilter}>
        <option value="reset">Attack Filter:</option>
        <option value="moreAttack">+ Attack</option>
        <option value="lessAttack">- Attack</option>
      
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
