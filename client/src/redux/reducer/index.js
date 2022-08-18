import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL } from "../actions"

const initialState = {
    pokemons: [],
    pokemonDetail: {}
}
const rootReducer = (state = initialState, action) => {
    switch(
        action.type
    )
    {
        case GET_ALL_POKEMONS:{
            return{
                ...state,
                pokemons: action.payload
            }
        }
        case GET_POKEMON_DETAIL:{
            return{
                ...state,
                pokemonDetail: action.payload
            }
        }
        default: {
            return {...state}
        }
    }
}
export default rootReducer