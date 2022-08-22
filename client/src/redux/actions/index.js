import axios from "axios"
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL"
export const GET_ALL_TYPES = "GET_ALL_TYPES"
export const GET_SEARCH_POKEMON = "GET_SEARCH_POKEMON"
export const CREATE_POKEMON = "CREATE_POKEMON"

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
            if(id == ""){
               dispatch({type: GET_POKEMON_DETAIL, payload: ""})
            }else
            {const response = await axios.get(`http://localhost:3001/pokemons/${id}`)
            if(response?.data){
                dispatch({type: GET_POKEMON_DETAIL, payload: response.data})
            }}
        } catch (e) {
            alert(e)
            console.log(e)
            
        }
    }
}

export const getAllTypes = ()=> {
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/types`)
            if(response?.data){
                dispatch({type: GET_ALL_TYPES, payload: response.data})
            }
        } catch (e) {
            alert(e)
        }
    }
}


export const getSearchPokemon = (name) =>{
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            if(response?.data){
                dispatch({type: GET_SEARCH_POKEMON, payload: response.data})
            }
        } catch (e) {
            alert(e)
        }
    }
}

export const createPokemon = (pokemon) => {
    return function(dispatch){
        try{
            fetch(`http://localhost:3001/pokemons`,{
                headers: {
                    "Content-Type": "application/json"
                },
                method: "post",
                body: JSON.stringify(pokemon)
            })
            dispatch({type: CREATE_POKEMON, payload: pokemon})
        }
        catch(e){
            alert(e)
        }
    }
}