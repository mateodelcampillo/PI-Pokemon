import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'

function CreatePokemon() {
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
  return (
    <div>CreatePokemon
    <form>
      <label>Name:</label>
      <input onChange={handleOnChange} name="name" type="text" />
      <label>Image:</label>
      <input name="image" onChange={handleOnChange} type="text" />
      <label>Types:</label>
      {stateTypes?.map((t,index) =>  <label name="types" key={index}><input onChange={handleOnChange} type="checkbox" name='types' value={t.name} />{t.name}</label>)}
      <label>Health:</label>
      <input name="health" onChange={handleOnChange} type="number" />
      <label>Attack:</label>
      <input name="attack" onChange={handleOnChange} type="number" />

      <label>Defense:</label>
      <input name="defense" onChange={handleOnChange} type="number" />

      <label>Speed:</label>
      <input name="speed" onChange={handleOnChange} type="number" />

      <label>Height:</label>
      <input name="height" onChange={handleOnChange} type="number" />

      <label>Weight:</label>
      <input name="weight" onChange={handleOnChange} type="number" />

      <button>Create!</button>
      
    </form>
    </div>
  )
}

export default CreatePokemon