import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonDetail } from '../../redux/actions'
import { Link } from 'react-router-dom'

function PokemonDetail(props) {
  const stateDetail = useSelector(state => state.pokemonDetail)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPokemonDetail(props.match.params?.id))
  }, [])
  return (<>
    <a onClick={(e) => {
      e.preventDefault()
      dispatch(getPokemonDetail(""))
    }}>
      <Link to="/home">Home</Link></a>
    <div>PokemonDetail</div>
    {Object.keys(stateDetail).length > 0 ?
      <>
        <h1>{stateDetail.name.toUpperCase()}</h1>
        <div><h4>Type:</h4>{stateDetail.types?.map(d => <span key={props.id}> {d.name ? d.name.toUpperCase() : d.toUpperCase()}/ </span>)}<br></br></div>

        <img src={stateDetail.image} alt={stateDetail.name} width="300px"></img>
      </>
      :
      <div>Puto</div>
    }
  </>
  )
}

export default PokemonDetail