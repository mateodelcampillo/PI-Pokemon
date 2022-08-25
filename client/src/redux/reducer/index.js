import { CREATE_POKEMON, FILTERED_POKEMONS, GET_ALL_POKEMONS, GET_ALL_TYPES, GET_POKEMON_DETAIL, GET_SEARCH_POKEMON } from "../actions"

const initialState = {
    pokemons: [],
    pokemonDetail: {},
    types: [],
    pokemonsCreated: [],
    pokemonsCopy: []
}
const rootReducer = (state = initialState, action) => {
    switch(
        action.type
    )
    {
        case GET_ALL_POKEMONS:{
            return{
                ...state,
                pokemons: action.payload,
                pokemonsCopy: [...action.payload]

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
            if(action.payload !== "No hay nada")
            {return{
                ...state,
                pokemonsCreated: [...action.payload]
            }}else
            {return{
                ...state,
                pokemonsCreated: []
            }
                

         }
        }
        case FILTERED_POKEMONS:{
            if(action.payload === "asc"){
                function comparation(a,b){
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1
                    return 0
                }
                return{
                    ...state,
                    pokemons: state.pokemonsCopy.sort(comparation)
                }
            }
            else if(action.payload === "desc"){
                function comparation(a,b){
                    if(a.name > b.name) return -1
                    if(a.name < b.name) return 1
                    return 0
                }
                return{
                    ...state,
                    pokemons: state.pokemonsCopy.sort(comparation)
                } 
            }
        }
        default: {
            return {...state}
        }
    }
}
export default rootReducer