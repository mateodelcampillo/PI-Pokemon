import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPokemons, getAllTypes } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPokemons())
    dispatch(getAllTypes())
  },[])
  return (
    <>
    <Route exact path="/" component={Landing}/>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/pokemon/:id" component={PokemonDetail}/>
    <Route exact path="/pokemon/create" component={CreatePokemon}/>
    </>
  );
}

export default App;
