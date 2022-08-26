import React from 'react'
import { Link } from 'react-router-dom'
import estilo from "./PokemonCard.module.css"
function PokemonCard(props) {
  return (
    <>
      <div className={estilo.divContainer}>
        <img className={estilo.img} src={props.image} alt={props.name} />
        <h2><Link to={`/pokemon/${props.id}`}>{props.name.toUpperCase()}</Link></h2>
        <div>Type:{props.types?.map((d, i) => <span key={i}> {d.name ? d.name.toUpperCase() : d.toUpperCase()}/ </span>)}</div>

      </div>
    </>
  )
}

export default PokemonCard