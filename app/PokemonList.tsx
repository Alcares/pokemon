import { Text, View, StyleSheet, FlatList } from "react-native";
import Fact from './Fact';

type PokemonListProps = { 
    pokemon: Array<object>
    onItemPress: Function;
};
  

export default function PokemonList({ pokemon, onItemPress }: PokemonListProps) {
    return (
      <View style={styles.appContainer}>
        <FlatList
            data={pokemon}
            renderItem={({item, index}) => <Fact onPress={onItemPress} pokemon={item}/>}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        marginTop: 60,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
  })
  