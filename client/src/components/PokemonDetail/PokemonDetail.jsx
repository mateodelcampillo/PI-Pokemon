import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonDetail } from '../../redux/actions'

function PokemonDetail(props) {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getPokemonDetail(props.match.params?.id))
  })
  return (
    <div>PokemonDetail</div>
  )
}

export default PokemonDetail