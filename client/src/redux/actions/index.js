import axios from "axios"
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_POKEMON_DETAIL= "GET_POKEMON_DETAIL"

export const getAllPokemons = () => {
    return async function(dispatch){
        try {
           const response = await axios.get("http://localhost:3001/pokemons") 
           if(response?.data){
            dispatch({type: GET_ALL_POKEMONS, payload:response.data})
           }
        } catch (e) {
            alert(e)
            console.log(e)
        }
    }
}
export const getPokemonDetail = (id) => {
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/pokemons/${id}`)
            if(response?.data){
                dispatch({type: GET_POKEMON_DETAIL, payload: response.data})
            }
        } catch (e) {
            alert(e)
            console.log(e)
        }
    }
}