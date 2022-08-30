import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { createPokemon, getAllPokemons, getCreatedPokemons } from '../../redux/actions'

function CreatePokemon() {
  const dispatch = useDispatch()
  const stateTypes = useSelector(state => state.types)
  const [newPokemon, setNewPokemon] = useState({
    name: "",
  types: [],
  weight: 0,
  height: 0,
  attack: 0,
  defense: 0,
  speed: 0,
  health: 0,
  image: ""
  })
  const [errorUsername, setErrorUsername] = useState("")
  function handleOnChange(e){
    if(e.target.name === "types"){
      if(e.target.checked){
        setNewPokemon({
          ...newPokemon,
          types:[...newPokemon.types, e.target.value]
        })
      }else{
        setNewPokemon({
          ...newPokemon,
          types: newPokemon.types.filter(t => t !== e.target.value)
        })
      }
    }else
    setNewPokemon({...newPokemon,
    [e.target.name]: e.target.value})
  }
  function handleOnSubmit(e){
    
      e.preventDefault()
   dispatch(createPokemon(newPokemon))
    
    
  }let errors= {}
  function handleVerification(e){
    
    if(e.target.name === "name"){
      function number(value){
        return /\d/.test(value)
      }
      if(number(e.target.value)){
       setErrorUsername("Nooooooo")
      }else{
        setErrorUsername("")
      }
    }
  }
  return (
    <div>CreatePokemon
      <a onClick={(e)=>{
        e.preventDefault()
        dispatch(getAllPokemons())
        dispatch(getCreatedPokemons())
      }}><Link to="/home">Home</Link></a>
    <form onSubmit={handleOnSubmit}>
      <label>Name:</label>
      <input onChange={(e)=> {handleOnChange(e); handleVerification(e)}} name="name" type="text" />
      <span>{errorUsername ? errorUsername : ""}</span>
      <br></br>
      <label>Image:</label>
      <input name="image" onChange={handleOnChange} type="text" /><br></br>
      <label>Types:</label>
      {stateTypes?.map((t,index) =>  <label name="types" key={index}><input onChange={handleOnChange} type="checkbox" name='types' value={t.name} />{t.name}</label>)}<br></br>
      <label>Health:</label>
      <input name="health" onChange={handleOnChange} type="number" /><br></br>
      <label>Attack:</label>
      <input name="attack" onChange={handleOnChange} type="number" /><br></br>

      <label>Defense:</label>
      <input name="defense" onChange={handleOnChange} type="number" /><br></br>

      <label>Speed:</label>
      <input name="speed" onChange={handleOnChange} type="number" /><br></br>

      <label>Height:</label>
      <input name="height" onChange={handleOnChange} type="number" /><br></br>

      <label>Weight:</label>
      <input name="weight" onChange={handleOnChange} type="number" /><br></br>

      <button>Create!</button>
      
    </form>
    </div>
  )
}

export default CreatePokemon