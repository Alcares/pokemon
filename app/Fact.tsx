import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useLayoutEffect, useMemo, useState } from 'react'
import api from '../utils/api';

type PokemonProps = { 
    pokemon: any
    onPress: Function
};

interface PokemonDetails {
    sprites: {
      front_default: string;
    },
    base_experience: string
  }


export default function Fact({ pokemon, onPress }: PokemonProps) {
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
    useLayoutEffect(() => {
        const fetchDeals = async () => {
            const newPokemonDetails = await api.pokemonDetails(pokemon['url']) as unknown as PokemonDetails;
            setPokemonDetails(newPokemonDetails)
        };
    
        fetchDeals();
    }, [])
    const handlePress = () => {
        onPress(pokemonDetails);
    }
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={handlePress}
      >
        <Image
            style={styles.image}
            source={{
                uri: pokemonDetails?.sprites.front_default,
            }}
        />
        <View>
            <Text style={[styles.factComponent, styles.factHeader]}>{pokemon['name']}</Text>
            <Text style={styles.factComponent}>EXP {pokemonDetails?.base_experience}</Text>
        </View>
      </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 15,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'lightgray',
    },
    image: {
        width: '100%',
        height: 150,
    },
    factComponent: {
        fontSize: 16,
        marginHorizontal: 12,
        marginVertical: 18,
    },
    factHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: -3,
    }
  })
  