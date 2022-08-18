import React from 'react'

function PokemonCard(props) {
  return (
    <>
    <div>
    <img src={props.image} alt={props.name}/>
    <h2>{props.name.toUpperCase()}</h2>
    {props.types?.map(d => <span key={props.id}>{d.name ? d.name.toUpperCase() : d.toUpperCase()}/ </span>)}

    </div>
    </>
  )
}

export default PokemonCard