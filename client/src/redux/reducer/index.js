import { CREATE_POKEMON, GET_ALL_POKEMONS, GET_ALL_TYPES, GET_POKEMON_DETAIL, GET_SEARCH_POKEMON } from "../actions"

const initialState = {
    pokemons: [],
    pokemonDetail: {},
    types: [],
    pokemonsCreated: []
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
        case GET_ALL_TYPES:{
            return{
                ...state,
                types: action.payload
            }
        }
        case GET_SEARCH_POKEMON:{
            return{
                ...state,
                pokemons: [action.payload]
            }
        }
        case CREATE_POKEMON:{
            return{
                ...state,
                pokemonsCreated: [...action.payload]
            }
        }
        default: {
            return {...state}
        }
    }
}
export default rootReducer