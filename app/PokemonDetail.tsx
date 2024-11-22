import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useLayoutEffect, useState, } from 'react'
import api from '../utils/api';
import { Link } from 'expo-router';


type FactListProps = { 
    pokemon: any
};

export default function PokemonDetail({ pokemon }: FactListProps) {
  const [abilityDetails, setAbilityDetails] = useState<Array<any>>(new(Array));
  useLayoutEffect(() => {
    let descriptions = new(Array)
    const fetchDeals = async () => {
        for (let ab of pokemon.abilities) {
          const url = ab.ability.url;
          const s = await api.abilityDetails(url);
          for (let ad of s) {
            const desc = ad.effect;
            descriptions.push(desc);
          }
        }
        setAbilityDetails(descriptions)
    };

    fetchDeals();
  }, [])

    return (
      <View style={styles.container}>
        <Image
            style={styles.image}
            source={{
                uri: pokemon?.sprites.front_default,
            }}
        />
        {/* <Link href="/PokemonList" asChild> */}
          <Pressable>
            <Text>Home</Text>
          </Pressable>
        {/* </Link> */}
        {abilityDetails.map((abilityDetail) => 
          <Text>{abilityDetail}</Text>
        )}
        {/* <View> */}
            {/* <Text>{JSON.stringify(pokemon, null, 2)}</Text> */}
        {/* </View> */}
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginHorizontal: 20,
        marginVertical: 15,

    },
    image: {
        width: '100%',
        height: 200,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'lightgray',
        marginBottom: 30,
    },
  })
  