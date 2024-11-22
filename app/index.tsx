import { Text, View, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState} from 'react'
import { Stack } from 'expo-router';
import api from '../utils/api';
import PokemonList from './PokemonList'
import PokemonDetail from './PokemonDetail'


export default function Index() {
  const [pokemon, setPokemon] = useState<Array<object>>(Array)
  const [selectedPokemon, selectPokemon] = useState<any>(null)
  useLayoutEffect(() => {
    const fetchPokemon = async () => {
      const pokemon = await api.catchPokemon();
      setPokemon(pokemon);
    };

    fetchPokemon();
  }, []);

  const updateSelectedPokemon = (pokemonDetails: any) => {
    selectPokemon(pokemonDetails);
  }
  
  if (selectedPokemon) {
    return <PokemonDetail pokemon={selectedPokemon}/>
  }
  if (pokemon.length > 0 ) {
    return <PokemonList pokemon={pokemon} onItemPress={updateSelectedPokemon}></PokemonList>
  }
  return (
    <>
    <Stack.Screen options={{ title: "PokeHub", headerShown: false,}} />
    <View style={styles.appContainer}>
      <Text style={styles.header}>PokeHub</Text>
    </View>
    </>
  );

}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 40,
  }
})
