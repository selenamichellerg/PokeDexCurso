import * as React from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useState, useEffect } from 'react';

import { PokemonCard } from './src/components/PokemonCard';

interface Pokemon {
  name: string;
  url: string;
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 32
  }
})

function HomeScreen({navigation}) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect( () => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results);
        
      })
  }, [])

  console.log(pokemon)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      
      {/* <FlatList
        data={pokemon}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <Text>{ item.name }</Text>
        )}>

      </FlatList> */}

      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCard url={item.url} />}
      />

      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;